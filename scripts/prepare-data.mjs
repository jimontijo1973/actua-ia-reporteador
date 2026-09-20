#!/usr/bin/env node
// scripts/prepare-data.mjs
//
// ── MECANISMO TEMPORAL ───────────────────────────────────────────────────────
// Existe sólo porque este proyecto se despliega subiendo archivos sueltos a
// Vercel, y los dos archivos de datos (creditos.json y plantillas.js, ~83 KB
// juntos) no caben en ese envío. Van comprimidos en src/data/_data.b64 y este
// script los reconstruye antes de compilar.
//
// EN CUANTO EL PROYECTO VIVA EN UN REPO DE GIT, ESTO SE BORRA:
//   - eliminar este archivo y src/data/_data.b64
//   - dejar el build como  "build": "vite build"
// Git sube los archivos reales y el rodeo deja de tener sentido.
//
// REGLA DE SEGURIDAD: este script NUNCA sobrescribe un archivo que ya existe.
// Si usted edita plantillas.js o regenera creditos.json, su versión manda.
// Lo que sí hay que hacer tras editarlos es volver a empaquetar:
//   npm run pack-data
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { brotliDecompressSync } from 'node:zlib';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const blob = resolve(raiz, 'src/data/_data.b64');

if (!existsSync(blob)) {
  console.log('  · sin _data.b64: se compila con los archivos del repositorio');
  process.exit(0);
}

const paquete = JSON.parse(
  brotliDecompressSync(Buffer.from(readFileSync(blob, 'utf8').trim(), 'base64')).toString(
    'utf8'
  )
);

for (const [ruta, contenido] of Object.entries(paquete)) {
  const destino = resolve(raiz, ruta);
  if (existsSync(destino)) {
    console.log('  · ya existe, se respeta:', ruta);
    continue;
  }
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, contenido, 'utf8');
  console.log('  · reconstruido:', ruta, `(${contenido.length} caracteres)`);
}
