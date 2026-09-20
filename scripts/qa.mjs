// scripts/qa.mjs — capturas y chequeos de desbordamiento horizontal
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const URL = process.env.QA_URL || 'http://127.0.0.1:4173/';
const OUT = '/tmp/qa';
mkdirSync(OUT, { recursive: true });

const vistas = [
  { nombre: 'movil', width: 390, height: 844 },
  { nombre: 'escritorio', width: 1440, height: 900 },
];

const errores = [];

for (const v of vistas) {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  });
  const page = await browser.newPage({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: 2,
  });
  page.on('console', (m) => {
    if (m.type() === 'error') errores.push(`[${v.nombre}] consola: ${m.text()}`);
  });
  page.on('pageerror', (e) => errores.push(`[${v.nombre}] pageerror: ${e.message}`));

  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);

  // Desbordamiento horizontal
  const ancho = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  if (ancho.scroll > ancho.client + 1) {
    errores.push(
      `[${v.nombre}] desborda ${ancho.scroll - ancho.client}px (scroll ${ancho.scroll} vs client ${ancho.client})`
    );
  }

  await page.screenshot({ path: `${OUT}/${v.nombre}-inicio.png` });

  // Abrir el ejemplo de la primera sección y capturar
  const verEjemplo = page.locator('button', { hasText: 'Ejemplo real' }).first();
  if (await verEjemplo.count()) {
    await verEjemplo.scrollIntoViewIfNeeded();
    await verEjemplo.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/${v.nombre}-ejemplo.png` });
  }

  // Probar el buscador de créditos
  const buscador = page.locator('input[type="search"]').first();
  await buscador.scrollIntoViewIfNeeded();
  await buscador.fill('comision');
  await page.waitForTimeout(400);
  const visibles = await page.locator('table tbody tr').count();
  console.log(`[${v.nombre}] filas tras buscar "comision" en la 1a sección: ${visibles}`);
  await page.screenshot({ path: `${OUT}/${v.nombre}-busqueda.png` });

  // Sección 3 completa
  await page.goto(URL + '#contabilidad', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${v.nombre}-contabilidad.png` });

  // Comprobar el enlace mailto
  const mailtos = await page.locator('a[href^="mailto:"]').evaluateAll((as) =>
    as.map((a) => ({ len: a.getAttribute('href').length }))
  );
  const largo = Math.max(...mailtos.map((m) => m.len));
  console.log(`[${v.nombre}] enlaces mailto: ${mailtos.length}, el más largo ${largo} car.`);
  if (largo > 1900) errores.push(`[${v.nombre}] un mailto mide ${largo} car. (>1900)`);

  await browser.close();
}

console.log('\n--- Resultado ---');
if (errores.length) {
  errores.forEach((e) => console.log('✗', e));
  process.exitCode = 1;
} else {
  console.log('✓ Sin errores de consola, sin desbordamiento horizontal, mailto dentro de límite.');
}
