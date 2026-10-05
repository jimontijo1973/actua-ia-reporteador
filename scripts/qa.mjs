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
  const buscador = page.locator('#premium input[type="search"]').first();
  await buscador.scrollIntoViewIfNeeded();
  await buscador.fill('comision');
  await page.waitForTimeout(400);
  const visibles = await page.locator('#premium table tbody tr').count();
  console.log(`[${v.nombre}] filas tras buscar "comision" en la 1a sección: ${visibles}`);
  await page.screenshot({ path: `${OUT}/${v.nombre}-busqueda.png` });

  // Sección [DIAGNOSTICO] / [REPORTE]: árbol, selector, tipos, plantilla, cobro y catálogo
  await page.goto(URL + '#servicio', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${v.nombre}-servicio.png` });

  const sec = page.locator('#servicio');
  if (!(await sec.getByText('El diagnóstico no entrega código; la modificación se hace en [REPORTE].').count()))
    errores.push(`[${v.nombre}] falta la frase clave del Diagnóstico`);

  for (const n of [1, 2, 3]) {
    await sec.getByRole('tab', { name: new RegExp(`Tipo ${n}`) }).click();
    const cuerpo = await sec.locator('pre code').first().textContent(); // asunto
    const plantilla = await sec.locator('pre code').nth(1).textContent();
    if (!plantilla.includes(`Tipo de solicitud: ${n}`))
      errores.push(`[${v.nombre}] la plantilla no refleja el tipo ${n}`);
    if (n === 3 && !plantilla.includes('ERROR O RESULTADO INCORRECTO'))
      errores.push(`[${v.nombre}] el tipo 3 no trae la sección de error`);
    if (n !== 3 && plantilla.includes('ERROR O RESULTADO INCORRECTO'))
      errores.push(`[${v.nombre}] el tipo ${n} no debe traer la sección de error`);
    if (!cuerpo.startsWith('[DIAGNOSTICO]')) errores.push(`[${v.nombre}] asunto sin [DIAGNOSTICO]`);
  }
  await sec.getByRole('tab', { name: 'Tipo 3 Mi reporte falla' }).screenshot({ path: `${OUT}/${v.nombre}-tipo3-tab.png` }).catch(() => {});

  // Cobro y catálogo (mismo número de créditos que el snapshot)
  await sec.getByText('Cobro', { exact: true }).scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/${v.nombre}-cobro.png` });
  await sec.locator('input[type="search"]').fill('saldos');
  await page.waitForTimeout(300);
  const filasDiag = await sec.locator('table tbody tr').count();
  console.log(`[${v.nombre}] filas en el catálogo del Diagnóstico tras buscar "saldos": ${filasDiag}`);

  // Ejemplo del Diagnóstico
  await sec.getByRole('button', { name: /Ejemplo: Saldos por proveedor/ }).click();
  await page.waitForTimeout(300);
  if (!(await sec.getByText('DISTRIBUIDORA EJEMPLO SA DE CV').count()))
    errores.push(`[${v.nombre}] el ejemplo del Diagnóstico no se despliega`);

  // Árbol → modo [REPORTE]
  await sec.getByRole('button', { name: /Ya sé qué reporte es/ }).click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/${v.nombre}-modo-reporte.png` });
  if (!(await sec.getByText('Procesar y entregar el código del reporte').count()))
    errores.push(`[${v.nombre}] el modo [REPORTE] no se muestra`);

  // El aviso retirado no debe existir
  if (await page.getByText('El formulario en línea se retiró').count())
    errores.push(`[${v.nombre}] sigue el aviso "El formulario en línea se retiró"`);
  // El robot carga
  const robotOk = await page.evaluate(() => {
    const i = document.querySelector('img[src$="brand/robot.webp"]');
    return !!i && i.complete && i.naturalWidth > 0;
  });
  if (!robotOk) errores.push(`[${v.nombre}] la imagen del robot no carga`);

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
