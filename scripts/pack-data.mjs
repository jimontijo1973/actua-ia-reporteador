#!/usr/bin/env node
// scripts/pack-data.mjs
// Regenera src/data/_data.b64 a partir de los archivos reales.
// Corra esto SIEMPRE que edite plantillas.js o regenere creditos.json,
// antes de volver a desplegar subiendo archivos a Vercel.
//
//   npm run pack-data
//
// Cuando el proyecto se despliegue desde git, este script y el blob se borran.

import { readFileSync, writeFileSync } from 'node:fs';
import { brotliCompressSync, constants } from 'node:zlib';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const RUTAS = ['src/data/creditos.json', 'src/data/plantillas.js'];

const paquete = {};
for (const r of RUTAS) {
  paquete[r] = readFileSync(resolve(raiz, r), 'utf8');
  console.log('  ·', r, paquete[r].length, 'caracteres');
}

const b64 = brotliCompressSync(Buffer.from(JSON.stringify(paquete), 'utf8'), {
  params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
}).toString('base64');

writeFileSync(resolve(raiz, 'src/data/_data.b64'), b64 + '\n', 'utf8');
console.log(`\n✓ src/data/_data.b64 regenerado (${(b64.length / 1024).toFixed(1)} KB)`);
