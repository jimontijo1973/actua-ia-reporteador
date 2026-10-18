// src/data/correccion.js
// Contenido del servicio Corrección. Sustituye al antiguo [DIAGNOSTICO] tipo 3.
// Se solicita con asunto [REPORTE] y el bloque "## SOLICITO CORRECCION" en el cuerpo.
// Los textos se editan aquí, nunca dentro del JSX.

export const INTRO = {
  titulo: 'Su reporte entregado marca error o no da lo esperado',
  texto:
    'Si un reporte que le entregó ACYA-BOT marca error al ejecutarse o el resultado no es el que pidió, solicite la Corrección. ACYA-BOT aplica las correcciones, le regresa el reporte sin costo y le reembolsa un crédito en compensación.',
  frase:
    'La Corrección se pide como [REPORTE], no como [DIAGNOSTICO]: lo que la distingue es el bloque ## SOLICITO CORRECCION.',
};

export const BENEFICIOS = [
  { titulo: 'Sin costo', texto: 'La corrección no consume créditos.' },
  { titulo: '1 crédito de regreso', texto: 'Se reembolsa al RFC de la solicitud, en compensación.' },
  { titulo: 'Sin plazo', texto: 'Puede pedirla en cualquier momento después de la entrega.' },
];

export const PASOS = [
  {
    n: 1,
    titulo: 'Reúna lo que pasó',
    texto:
      'El mensaje de error tal como aparece, en qué momento salió y los parámetros que capturó al ejecutar el reporte.',
  },
  {
    n: 2,
    titulo: 'Envíe el [REPORTE] con el bloque de corrección',
    texto:
      'Mismo asunto del reporte original terminado en "- correccion", la plantilla de abajo y el .rpt que ejecutó adjunto.',
  },
  {
    n: 3,
    titulo: 'Reciba el reporte corregido',
    texto:
      'ACYA-BOT le responde al correo de "Responder a" con el archivo corregido y el crédito reembolsado.',
  },
];

export const CAMPOS = [
  {
    campo: 'Fila original',
    texto: 'El número (#) de la solicitud original, tal como viene en el correo de entrega.',
  },
  { campo: 'Error', texto: 'El texto exacto del mensaje, copiado del Visor de Errores.' },
  { campo: 'Momento', texto: 'Al ejecutar, al exportar a Excel, al imprimir…' },
  { campo: 'Parametros usados', texto: 'Los valores que capturó cuando falló.' },
  { campo: 'Esperado', texto: 'Lo que debería salir.' },
  { campo: 'Obtenido', texto: 'Lo que salió en realidad.' },
];

export const ASUNTO = '[REPORTE] <nombre del reporte original> - correccion';

export const PLANTILLA = `# SOLICITUD REPORTEADOR
RFC: <RFC de la solicitud original>
Cliente: <nombre o razón social>
Sistema: <Comercial Premium | Contabilidad | Bancos | Nominas>
Version: <versión del sistema instalada>
Reporte: <nombre del reporte original>
Archivo: <ARCHIVO.rpt que se ejecutó>
Bases externas: <ninguna, o las que use>
Salida: <Excel OLE | Impreso | PDF>
Responder a: <correo>

## SOLICITO CORRECCION
Fila original: <# de la solicitud original>
Error: <texto exacto del mensaje de error>
Momento: <al ejecutar | al exportar | al imprimir>
Parametros usados: <valores que capturó>
Esperado: <lo que debería salir>
Obtenido: <lo que salió>

## INSTRUCCIONES
Corregir el error sin cambiar parametros ni formato.

## PARAMETROS
Sin cambios.

## VALIDACION
<Cómo comprobar que quedó: una cifra, un conteo o un total verificable.>

Adjuntos: <ARCHIVO.rpt que se ejecutó> y, si la tiene, captura del Visor de Errores.`;

// Esqueleto corto para mailto: (Outlook de escritorio trunca cerca de 2,000 caracteres).
export const CUERPO_CORTO = `# SOLICITUD REPORTEADOR
RFC:
Cliente:
Sistema:
Version:
Reporte:
Archivo:
Bases externas:
Salida:
Responder a:

## SOLICITO CORRECCION
Fila original:
Error:
Momento:
Parametros usados:
Esperado:
Obtenido:

## INSTRUCCIONES
Corregir el error sin cambiar parametros ni formato.

## PARAMETROS
Sin cambios.

## VALIDACION

`;

export const EJEMPLO = {
  titulo: 'Percepción por departamento, periodos en columnas',
  contexto: 'Nóminas, salida a Excel. Datos de demostración.',
  asunto: '[REPORTE] Percepcion por departamento, periodos en columnas - correccion',
  cuerpo: `# SOLICITUD REPORTEADOR
RFC: XAXX010101000
Cliente: EMPRESA DEMO
Sistema: Nominas
Version: 19.35
Reporte: Percepcion por departamento, periodos en columnas
Archivo: GRAEXCPEISREXCEL.rpt
Bases externas: ninguna
Salida: Excel OLE
Responder a: contacto@empresademo.com

## SOLICITO CORRECCION
Fila original: #80
Error: java.lang.Exception: Error procesando linea: 901 (null)
Momento: al ejecutar
Parametros usados: Ejercicio 2026, Semanal, periodos 1 al 10, percepcion Sueldo, demas por omision
Esperado: una columna por periodo con el importe de cada empleado
Obtenido: el visor marca el error en la linea 901 y Excel no se llena

## INSTRUCCIONES
Corregir el error sin cambiar parametros ni formato del Excel.

## PARAMETROS
Sin cambios.

## VALIDACION
Con 10 periodos el reporte llena las 10 columnas y el TOTAL es la suma.

Adjuntos: GRAEXCPEISREXCEL.rpt (el que se ejecuto) y captura del Visor de Errores.`,
};

export const IMPORTANTE = [
  {
    titulo: 'Asunto con [REPORTE]',
    texto: 'La corrección se reconoce por el prefijo [REPORTE] más el bloque ## SOLICITO CORRECCION. No la envíe como [DIAGNOSTICO].',
  },
  {
    titulo: 'Adjunte el .rpt que ejecutó',
    texto: 'El mismo archivo que le entregamos, tal como lo corrió, con sus librerías si las usa.',
  },
  {
    titulo: 'Copie el error exacto',
    texto: 'El número de línea del Visor de Errores es lo que lleva directo al punto que se corrige.',
  },
  {
    titulo: 'Una corrección por correo',
    texto: 'Si son dos reportes distintos, son dos correos.',
  },
];
