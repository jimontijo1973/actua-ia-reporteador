# ACTUA-IA · Robot Reporteador CONTPAQi®

Sitio de intake por correo para solicitudes de modificación de reportes CONTPAQi®.
Sustituye al formulario en línea anterior (propio y embebido de Notion), que en pruebas
no recibía de forma confiable el código de los reportes.

**Producción:** https://actua-ia-reporteador.vercel.app
**Repositorio:** https://github.com/jimontijo1973/actua-ia-reporteador (rama `main`)
**Proyecto Vercel:** `prj_FPBUish4nQvRWEG9qmn0dlQwyIBo` · team `team_ENuFmh386PdEYJWaAKl0ioON`

Cada push a `main` despliega a producción. La protección de despliegue está desactivada:
la URL es pública.

## Qué hace

Dos servicios por el mismo buzón, distinguidos por el prefijo del asunto:

- `[REPORTE]` — procesa y entrega el código del reporte modificado.
- `[DIAGNOSTICO]` — **nuevo**. Análisis previo para quien no sabe qué reporte usar, cómo
  pedir el ajuste o por qué falla su reporte. No entrega código: devuelve el análisis y, en
  el tipo 2, la solicitud `[REPORTE]` prellenada (que se cobra aparte al enviarla).

La sección **Elija su servicio** (`#servicio`, tras "Cómo funciona") trae el árbol de
decisión, el selector `[DIAGNOSTICO]` | `[REPORTE]`, los tres tipos de solicitud (1, 2, 3)
con su plantilla y botón de correo, el ejemplo, la tabla de cobro y el catálogo de
créditos. La etiqueta NUEVO se apaga sola en `site.nuevoHasta` (1/nov/2026).

Después vienen tres secciones, una por sistema. Cada una trae:

1. Lo particular de ese sistema al escribir la solicitud.
2. El asunto del correo, copiable.
3. La plantilla del cuerpo, copiable, con marcadores entre corchetes.
4. Un botón **Abrir en mi correo** (`mailto:`) y otro **Copiar plantilla completa**.
5. Un ejemplo real anonimizado, plegable, con el análisis de por qué funciona.
6. Una lista de verificación antes de enviar.
7. El catálogo de reportes de ese sistema, con buscador, y los créditos de cada uno.

## Stack

React 18 + Vite 5 + Tailwind 3 + Lucide. Sin backend, sin endpoint, sin token en el
navegador. `npm run build` genera `/dist`, estático y con rutas relativas: sube igual a
Vercel o al Administrador de Archivos de Hostinger (`public_html`).

## Comandos

```bash
npm install
npm run dev          # desarrollo
npm run build        # genera /dist
npm run preview      # sirve /dist local
npm run creditos     # regenera el catálogo desde Notion (requiere NOTION_TOKEN)
```

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Correos, teléfonos, buzón, razón social, fecha del catálogo | `src/config/site.js` |
| Plantillas, ejemplos, reglas, checklists, campos del encabezado ([REPORTE]) | `src/data/plantillas.js` |
| Todo el contenido de [DIAGNOSTICO]: tipos, plantilla, ejemplo, cobro | `src/data/diagnostico.js` |
| Fecha en que se apaga NUEVO, URL del bautizo del robot | `src/config/site.js` |
| Robot del Hero | `public/brand/robot.webp` |
| Catálogo de créditos | `src/data/creditos.json` (generado) |
| Preguntas frecuentes | `src/components/Preguntas.jsx` |
| Paleta de marca | `tailwind.config.js` |

Nunca se editan textos dentro del JSX de los componentes.

## El catálogo de créditos

En modo [DIAGNOSTICO] el mismo catálogo se muestra como "Con adjunto": en las 423 filas,
`Creditos = ceil(Caracteres / 60,000)`, que es exactamente la regla de cobro del diagnóstico
con adjunto (las librerías adjuntas suman caracteres; sin adjunto cuesta 1).

Snapshot de la base **💰 CREDITOS REPORTEADOR** de Notion
(`collection://3da09454-9aa3-80eb-bacd-000be894e2d8`), compilado dentro del bundle.
Campos: `Nombre` → `n`, `Caracteres` → `c`, `Creditos` → `k`, `Sistema` → `s`.

423 renglones al 14/Sep/2026: Contabilidad 169, Premium 106, Nóminas 91, Bancos 57.

Para actualizarlo:

```bash
NOTION_TOKEN=ntn_xxx npm run creditos
# actualizar site.creditosActualizados en src/config/site.js
git commit -am "Actualiza catálogo de créditos" && git push   # Vercel despliega solo
```

Se eligió snapshot en vez de endpoint en vivo a propósito: no hay token en el cliente, no
hay una llamada a Notion por visitante, y un cambio de esquema en Notion no puede tumbar
la página — que fue justo lo que pasó con el endpoint del formulario anterior.

## Límites del botón de correo (no son de este sitio)

- `mailto:` **no puede adjuntar archivos**. Ninguna página web puede. El `.RPT` lo adjunta
  el usuario. Por eso el aviso al pie del botón.
- Outlook de escritorio trunca la URL alrededor de los **2,000 caracteres**. Por eso el
  botón manda sólo el esqueleto (~900 caracteres) y la plantilla completa va por el botón
  de copiar. No mover ese reparto sin volver a medir.

## Pendientes

1. Apuntar el DNS de `www.actualizate-ia.com.mx` a Vercel y conectar el dominio.
2. Confirmar razón social (`S. de R.L.` vs `S.C. de R.L.`) y el wording autorizado de
   "Distribuidor Máster CONTPAQi®".
3. Crear los buzones `ventas@` y `soporte@actualizate-ia.com.mx` — el footer los enlaza.

## QA

`scripts/qa.mjs` levanta Chromium sobre el preview local y verifica: sin errores de
consola, sin desbordamiento horizontal a 390 px y a 1440 px, el buscador filtra, ningún
enlace `mailto:` pasa de 1,900 caracteres, y la sección [DIAGNOSTICO] (frase clave, las
tres plantillas por tipo, ejemplo, catálogo, modo [REPORTE], robot cargado y ausencia del
aviso retirado del formulario). Requiere `npm i -D playwright`.
