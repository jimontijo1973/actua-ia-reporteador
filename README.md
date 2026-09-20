# ACTUA-IA · Robot Reporteador CONTPAQi®

Sitio de intake por correo para solicitudes de modificación de reportes CONTPAQi®.
Sustituye al formulario en línea anterior (propio y embebido de Notion), que en pruebas
no recibía de forma confiable el código de los reportes.

**Producción:** https://actua-ia-reporteador.vercel.app
**Proyecto Vercel:** `prj_FPBUish4nQvRWEG9qmn0dlQwyIBo` · team `team_ENuFmh386PdEYJWaAKl0ioON`

## Qué hace

Tres secciones, una por sistema. Cada una trae:

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
npm run pack-data    # ver "Mecanismo temporal" abajo
```

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Correos, teléfonos, buzón, razón social, fecha del catálogo | `src/config/site.js` |
| Plantillas, ejemplos, reglas, checklists, campos del encabezado | `src/data/plantillas.js` |
| Catálogo de créditos | `src/data/creditos.json` (generado) |
| Preguntas frecuentes | `src/components/Preguntas.jsx` |
| Paleta de marca | `tailwind.config.js` |

Nunca se editan textos dentro del JSX de los componentes.

## El catálogo de créditos

Snapshot de la base **💰 CREDITOS REPORTEADOR** de Notion
(`collection://3da09454-9aa3-80eb-bacd-000be894e2d8`), compilado dentro del bundle.
Campos: `Nombre` → `n`, `Caracteres` → `c`, `Creditos` → `k`, `Sistema` → `s`.

423 renglones al 14/Sep/2026: Contabilidad 169, Premium 106, Nóminas 91, Bancos 57.

Para actualizarlo:

```bash
NOTION_TOKEN=ntn_xxx npm run creditos
# actualizar site.creditosActualizados en src/config/site.js
npm run pack-data    # mientras exista el mecanismo temporal
npm run build
```

Se eligió snapshot en vez de endpoint en vivo a propósito: no hay token en el cliente, no
hay una llamada a Notion por visitante, y un cambio de esquema en Notion no puede tumbar
la página — que fue justo lo que pasó con el endpoint del formulario anterior.

## Mecanismo temporal: `_data.b64`

Mientras el proyecto se despliegue subiendo archivos sueltos a Vercel (sin repo git),
`src/data/creditos.json` y `src/data/plantillas.js` no caben en el envío. Van comprimidos
en `src/data/_data.b64` y `scripts/prepare-data.mjs` los reconstruye antes de compilar.

Ese script **nunca sobrescribe un archivo que ya exista**: en local su versión siempre
manda. Pero si edita esos archivos, regenere el paquete con `npm run pack-data` antes de
desplegar, o Vercel compilará con la versión vieja.

**En cuanto el proyecto viva en un repo de git, esto se borra:**

- eliminar `scripts/prepare-data.mjs`, `scripts/pack-data.mjs` y `src/data/_data.b64`
- dejar `"build": "vite build"` en `package.json`

## Límites del botón de correo (no son de este sitio)

- `mailto:` **no puede adjuntar archivos**. Ninguna página web puede. El `.RPT` lo adjunta
  el usuario. Por eso el aviso al pie del botón.
- Outlook de escritorio trunca la URL alrededor de los **2,000 caracteres**. Por eso el
  botón manda sólo el esqueleto (~900 caracteres) y la plantilla completa va por el botón
  de copiar. No mover ese reparto sin volver a medir.

## Pendientes

1. **Protección de despliegue.** El team tiene `ssoProtection: all_except_custom_domains`:
   hoy la URL `.vercel.app` pide cuenta de Vercel. Hay que desactivarla o conectar
   `www.actualizate-ia.com.mx` para que el piloto entre.
2. **Repositorio en GitHub** y proyecto ligado, para desplegar en cada push y quitar el
   mecanismo temporal.
3. Confirmar razón social (`S. de R.L.` vs `S.C. de R.L.`) y el wording autorizado de
   "Distribuidor Máster CONTPAQi®".
4. Crear los buzones `ventas@` y `soporte@actualizate-ia.com.mx` — el footer los enlaza.

## QA

`scripts/qa.mjs` levanta Chromium sobre el preview local y verifica: sin errores de
consola, sin desbordamiento horizontal a 390 px y a 1440 px, el buscador filtra, y ningún
enlace `mailto:` pasa de 1,900 caracteres. Requiere `npm i -D playwright`.
