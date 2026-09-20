#!/usr/bin/env node
// scripts/fetch-creditos.mjs
//
// Regenera src/data/creditos.json desde la base 💰 CREDITOS REPORTEADOR de Notion.
// El snapshot se compila dentro del bundle: no hay token en el navegador ni una
// llamada a Notion por cada visitante, y el /dist funciona igual en Vercel o en
// el Administrador de Archivos de Hostinger.
//
//   NOTION_TOKEN=ntn_xxx npm run creditos
//
// Correrlo cuando cambie el catálogo, y volver a desplegar.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA_SOURCE_ID = '3da09454-9aa3-80eb-bacd-000be894e2d8';
const DATABASE_ID = '3da09454-9aa3-8002-94a0-cb107cbce129';
const NOTION_VERSION = '2025-09-03';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DESTINO = resolve(__dirname, '../src/data/creditos.json');

const token = process.env.NOTION_TOKEN;
if (!token) {
  console.error('Falta NOTION_TOKEN. Uso: NOTION_TOKEN=ntn_xxx npm run creditos');
  process.exit(1);
}

const cabeceras = {
  Authorization: `Bearer ${token}`,
  'Notion-Version': NOTION_VERSION,
  'Content-Type': 'application/json',
};

async function consultar(url, cursor) {
  const res = await fetch(url, {
    method: 'POST',
    headers: cabeceras,
    body: JSON.stringify({
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} — ${await res.text()}`);
  }
  return res.json();
}

function texto(prop) {
  if (!prop) return '';
  if (prop.type === 'title') return (prop.title || []).map((t) => t.plain_text).join('');
  if (prop.type === 'rich_text')
    return (prop.rich_text || []).map((t) => t.plain_text).join('');
  return '';
}

async function main() {
  // La API nueva consulta por data_source; si el espacio aún no la expone, se
  // cae al endpoint clásico de database.
  const candidatos = [
    `https://api.notion.com/v1/data_sources/${DATA_SOURCE_ID}/query`,
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
  ];

  let url = null;
  let primera = null;
  for (const c of candidatos) {
    try {
      primera = await consultar(c);
      url = c;
      break;
    } catch (e) {
      console.warn(`  · ${c.split('/v1/')[1]} no respondió: ${e.message.slice(0, 120)}`);
    }
  }
  if (!url) throw new Error('Ningún endpoint de Notion respondió.');

  const items = [];
  let pagina = primera;
  let n = 0;

  for (;;) {
    n += 1;
    for (const fila of pagina.results) {
      const p = fila.properties || {};
      items.push({
        n: texto(p['Nombre']),
        c: p['Caracteres']?.number ?? null,
        k: p['Creditos']?.number ?? null,
        s: p['Sistema']?.select?.name ?? null,
      });
    }
    process.stdout.write(`  · página ${n}: ${items.length} renglones\r`);
    if (!pagina.has_more) break;
    pagina = await consultar(url, pagina.next_cursor);
  }

  items.sort((a, b) => a.s?.localeCompare(b.s, 'es') || a.n.localeCompare(b.n, 'es'));

  const salida = {
    generado: new Date().toISOString().slice(0, 10),
    total: items.length,
    items,
  };

  mkdirSync(dirname(DESTINO), { recursive: true });
  writeFileSync(DESTINO, JSON.stringify(salida, null, 0) + '\n', 'utf8');

  const porSistema = items.reduce((acc, r) => {
    acc[r.s] = (acc[r.s] || 0) + 1;
    return acc;
  }, {});
  console.log(`\n✓ ${items.length} renglones →  src/data/creditos.json`);
  console.log('  ', porSistema);
  console.log('\n  Recuerde actualizar site.creditosActualizados y volver a desplegar.');
}

main().catch((e) => {
  console.error('\n✗', e.message);
  process.exit(1);
});
