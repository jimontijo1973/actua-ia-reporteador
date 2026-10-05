// src/data/diagnostico.js
// Contenido del servicio [DIAGNOSTICO]. Fuente: DIAGNOSTICO.md.
// Los textos se editan aquí, nunca dentro del JSX.

// Catálogo completo (los cuatro sistemas) para el explorador de créditos.
export const FILTRO_CREDITOS_DIAGNOSTICO = ['Premium', 'Nominas', 'Contabilidad', 'Bancos'];

export const FRASE_CLAVE =
  'El diagnóstico no entrega código; la modificación se hace en [REPORTE].';

export const INTRO = {
  titulo: 'Pida el análisis antes de pedir el reporte',
  texto:
    'Use [DIAGNOSTICO] cuando usted sabe lo que necesita ver en pantalla, pero no sabe cómo se programa. Descríbalo con sus palabras: le regresamos el análisis y, cuando aplica, la solicitud [REPORTE] ya preparada para que solo la envíe.',
  aplica: 'Aplica a los cuatro sistemas: Comercial Premium, Contabilidad, Bancos y Nóminas.',
};

export const COMPARATIVO = [
  {
    etiqueta: '[REPORTE]',
    sirve: 'Procesar y entregar el código del reporte',
    recibe: 'El reporte modificado',
  },
  {
    etiqueta: '[DIAGNOSTICO]',
    nuevo: true,
    sirve: 'Preparar la solicitud: qué reporte usar o modificar, qué corregir',
    recibe: 'Análisis, correcciones y la solicitud [REPORTE] lista',
  },
];

export const FLUJO = [
  {
    n: 1,
    titulo: 'Envíe el [DIAGNOSTICO]',
    texto: 'Un correo con el asunto [DIAGNOSTICO] y la plantilla de abajo.',
  },
  {
    n: 2,
    titulo: 'Reciba el análisis',
    texto: 'Le respondemos en el mismo hilo, con la versión del fabricante sobre la que se hizo.',
  },
  {
    n: 3,
    titulo: 'Envíe el [REPORTE] prellenado',
    texto:
      'Si el diagnóstico lo permite, la respuesta trae la solicitud lista. Usted la revisa, adjunta su .rpt y la envía. Ese envío se cobra aparte.',
  },
];

export const NOTA_VERSION =
  'Todas las respuestas indican la versión del fabricante sobre la que se hizo el análisis. Si su versión es distinta, el archivo instalado manda.';

export const TIPOS = [
  {
    valor: 1,
    corto: 'No sé qué reporte usar',
    arbol: 'No sé qué reporte usar',
    arbolTexto: 'Descríbanos qué necesita ver y le proponemos los reportes que se acercan.',
    cuando: 'No sé qué reporte usar o modificar.',
    adjunto: 'Opcional',
    recibeTitulo: 'Tipo 1 — No sé qué reporte usar',
    recibe: [
      'Una lista de reportes propuestos.',
      'Para cada uno se explica qué puede obtener con los cambios necesarios.',
    ],
  },
  {
    valor: 2,
    corto: 'Quiero ajustar un reporte',
    arbol: 'Quiero ajustar un reporte, pero no sé cómo se programa',
    arbolTexto: 'Le decimos cuál es el reporte base y le regresamos la solicitud [REPORTE] lista.',
    cuando: 'Quiero ajustar un reporte que ya existe.',
    adjunto: 'Opcional',
    recibeTitulo: 'Tipo 2 — Quiero ajustar este reporte',
    recibe: [
      'El reporte base que ya hace lo más parecido a lo que usted describe.',
      'Correcciones a su petición: puntos ambiguos, riesgos y qué otros reportes se afectarían si se modifica.',
      'La solicitud [REPORTE] prellenada, lista para enviar.',
      'Preguntas para cerrar la solicitud.',
    ],
  },
  {
    valor: 3,
    corto: 'Mi reporte falla',
    arbol: 'Mi reporte marca error o da resultados incorrectos',
    arbolTexto: 'Con su .rpt adjunto le indicamos la causa, la línea y dónde intervenir.',
    cuando: 'Mi reporte marca error o da resultados incorrectos.',
    adjunto: 'Obligatorio',
    recibeTitulo: 'Tipo 3 — Mi reporte falla',
    recibe: [
      'Una lista de las correcciones necesarias: la causa del error, con número de línea y el punto donde se debe intervenir.',
    ],
  },
];

// Salida del "árbol de decisión": tres tipos de [DIAGNOSTICO] y la salida directa a [REPORTE].
export const ARBOL_REPORTE = {
  titulo: 'Ya sé qué reporte es y qué cambio quiero',
  texto: 'Use la plantilla [REPORTE] de su sistema, con el .RPT adjunto.',
};

// ─────────────────────────────────────────────────── Plantilla del correo

const ENCABEZADO = (tipo) => `# SOLICITUD DIAGNOSTICO
RFC: <RFC al que se cargan los créditos>
Cliente: <nombre o razón social>
Sistema: <Comercial Premium | Contabilidad | Bancos | Nóminas>
Version: <versión del sistema instalada>
Tipo de solicitud: ${tipo}
Reporte: ${tipo === 1 ? 'no sé' : '<nombre del reporte o la ruta del menú; si no lo sabe, escriba "no sé">'}
Archivo: <nombre del .rpt adjunto, si lo envía>
Salida deseada: <Excel | Impreso | Pantalla | No sé>
Responder a: <correo>`;

const LO_QUE_NECESITA = `

## LO QUE NECESITA
<Descríbalo con sus palabras, como se lo explicaría a un compañero.
Qué datos quiere ver, cómo quiere agruparlos o totalizarlos.>

## COMO LO VE HOY (opcional)
<Qué muestra el reporte actual y qué le falta o le sobra.>

## COMO LO QUIERE VER (opcional)
<Lista de columnas o datos, en el orden deseado.
Si tiene un ejemplo, descríbalo en texto.>`;

const ERROR_TIPO_3 = `

## ERROR O RESULTADO INCORRECTO (solo tipo 3)
<Texto exacto del mensaje de error, o qué importe o dato sale mal
y cuál esperaba. Indique qué parámetros capturó.>`;

// Cuerpo completo para copiar. Los tipos 1 y 2 omiten la sección exclusiva del tipo 3.
export function plantillaDiagnostico(tipo) {
  return ENCABEZADO(tipo) + LO_QUE_NECESITA + (tipo === 3 ? ERROR_TIPO_3 : '');
}

// Esqueleto corto para mailto: (Outlook de escritorio trunca cerca de 2,000 caracteres).
export function cuerpoCortoDiagnostico(tipo) {
  return `# SOLICITUD DIAGNOSTICO
RFC:
Cliente:
Sistema:
Version:
Tipo de solicitud: ${tipo}
Reporte:${tipo === 1 ? ' no sé' : ''}
Archivo:
Salida deseada:
Responder a:

## LO QUE NECESITA

${tipo === 3 ? '\n## ERROR O RESULTADO INCORRECTO (solo tipo 3)\n\n' : ''}`;
}

// ─────────────────────────────────────────────────── Ejemplo

export const EJEMPLO = {
  titulo: 'Saldos por proveedor en Excel con cuenta bancaria y órdenes de compra',
  contexto: 'Tipo 2, Comercial Premium. Datos de demostración.',
  asunto:
    '[DIAGNOSTICO] Saldos por proveedor en Excel con cuenta bancaria y órdenes de compra',
  cuerpo: `# SOLICITUD DIAGNOSTICO
RFC: XAXX010101000
Cliente: DISTRIBUIDORA EJEMPLO SA DE CV
Sistema: Comercial Premium
Version: 12.10
Tipo de solicitud: 2
Reporte: Saldos de documentos por proveedor
Archivo: SaldosClienteProveedor.rpt
Salida deseada: Excel
Responder a: contacto@ejemplo.com.mx

## LO QUE NECESITA
Quiero el reporte de saldos por proveedor pasado completo a Excel, con
las mismas columnas que tiene hoy, y que siga haciendo cortes por
moneda, subtotal por proveedor y total por moneda.

Al final de cada renglón necesito los datos bancarios del proveedor:
número de cuenta, nombre de la cuenta y banco.

También quiero un segundo listado, en otra hoja, con las órdenes de
compra que todavía tienen unidades pendientes por recibir. Debe hacer
los mismos cortes y totales que el primero.

## COMO LO VE HOY (opcional)
Sale impreso. Para pasarlo a Excel tengo que capturar todo a mano y
las órdenes de compra no aparecen en ningún lado.

## COMO LO QUIERE VER (opcional)
Hoja 1 "Saldos": Código, Nombre Proveedor, Serie, Folio, Fecha Docto,
Fecha Vencimiento, Días Vence, Importe Cargo, Abonos, Saldo, Ut o Per
Cambiaria, Número de Cuenta, Nombre Cuenta, Banco.

Hoja 2 "Órdenes de Compra": Código, Nombre Proveedor, Serie, Folio,
Fecha, Fecha Entrega, Importe Total, Unidades Totales, Importe
Pendiente, Unidades Pendientes.`,
  respuesta: [
    {
      titulo: 'Reporte base',
      texto: 'El reporte nativo de saldos por proveedor, y si tiene una versión Excel.',
    },
    {
      titulo: 'Correcciones a su petición',
      texto:
        'De dónde salen los datos bancarios del proveedor y cómo se calcula el "importe pendiente" de una orden de compra.',
    },
    {
      titulo: 'Solicitud [REPORTE] lista',
      texto: 'Con instrucciones, parámetros y criterios de validación.',
    },
    {
      titulo: 'Preguntas para cerrar',
      texto: 'Por ejemplo, si el segundo listado debe incluir órdenes en todas las monedas.',
    },
  ],
};

// ─────────────────────────────────────────────────── Cobro

export const COBRO = {
  tabla: [
    { caso: 'Solicitud sin adjunto', creditos: '1 por respuesta' },
    {
      caso: 'Solicitud con adjunto',
      creditos:
        '1 por cada 60,000 caracteres del .rpt más las librerías adjuntas (mínimo 1)',
    },
    {
      caso: 'Réplicas en el mismo hilo',
      creditos:
        'Cada respuesta cuesta lo mismo que la primera, aunque la solicitud ya esté casi completa',
    },
  ],
  notas: [
    'Los créditos se descuentan del RFC que usted indique en la solicitud.',
    'La respuesta le informa cuántos créditos consumió y su saldo restante.',
    'Si el RFC no tiene saldo suficiente, la solicitud no se atiende hasta que recargue.',
    'Si su reporte usa librerías y no las adjunta, se diagnostica de todos modos con una advertencia, y el cobro no cambia.',
    'El [REPORTE] prellenado que reciba en el tipo 2 se cobra aparte, cuando usted lo envíe.',
  ],
  catalogo: {
    titulo: 'Reportes que puede adjuntar',
    descripcion:
      'Busque su archivo por nombre. Con adjunto, el diagnóstico cuesta lo mismo que aparece aquí: 1 crédito por cada 60,000 caracteres, mínimo 1.',
    columna: 'Con adjunto',
    nota: 'Aproximado: las librerías que adjunte suman caracteres. Sin adjunto, 1 crédito por respuesta.',
  },
};

// ─────────────────────────────────────────────────── Importante

export const IMPORTANTE = [
  {
    titulo: 'Solo se analizan adjuntos .rpt',
    texto:
      'Capturas de pantalla, PDF y Excel no se abren ni se cobran. Si una captura muestra algo relevante (un cliente, un folio, un importe), descríbalo en texto.',
  },
  {
    titulo: 'Los archivos no se conservan',
    texto: 'Al enviar el [REPORTE] vuelva a adjuntar el .rpt y sus librerías.',
  },
  {
    titulo: 'Para réplicas, conteste el mismo hilo',
    texto: 'Conserve el asunto tal como está.',
  },
  {
    titulo: 'Su archivo instalado manda',
    texto:
      'Los diagnósticos se hacen sobre la última versión publicada por el fabricante. Si el suyo es distinto, el instalado manda.',
  },
  {
    titulo: 'No necesita describir tablas ni programación',
    texto: 'Usted conoce las pantallas de su sistema y eso basta.',
  },
];

// ─────────────────────────────────────────────────── Modo [REPORTE] del selector

export const MODO_REPORTE = {
  titulo: '[REPORTE] — Procesar y entregar el código del reporte',
  texto:
    'Úselo cuando usted ya sabe qué reporte se modifica y qué cambio quiere. Cada sistema tiene su plantilla, sus reglas y su catálogo de créditos más abajo.',
  puntos: [
    'Adjunte el .RPT que tiene instalado, con sus librerías.',
    'El asunto empieza con [REPORTE].',
    'Un reporte por correo.',
    'Si el [DIAGNOSTICO] le devolvió una solicitud prellenada, revísela y envíela tal cual.',
  ],
  pie: '¿No sabe qué reporte usar o cómo pedir el cambio? Cambie a [DIAGNOSTICO].',
};
