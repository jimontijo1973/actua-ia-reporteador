// src/data/plantillas.js
// Contenido de las tres secciones. Los ejemplos son casos reales atendidos,
// con RFC, correos, razones sociales y UUID sustituidos por datos de demostración.

const CIERRE_CORREO = `
------------------------------------------------------------
IMPORTANTE: adjunte el archivo .RPT que tiene INSTALADO antes
de enviar. Sin adjunto la solicitud se rebota: por este canal
no se crean reportes nuevos desde cero.
Un reporte por correo. Si el cambio toca una libreria,
adjuntela tambien en el mismo mensaje.
------------------------------------------------------------`;

function cuerpoCorto(sistema, basesExternas) {
  return `SOLICITUD REPORTEADOR

RFC:
Cliente:
Sistema: ${sistema}
Version:
Reporte:
Archivo:
Bases externas: ${basesExternas}
Salida: Excel OLE
Responder a:

INSTRUCCIONES
1.

PARAMETROS
NO SE MODIFICAN.

CONSULTASQL

EJEMPLOQUERY

VALIDACION
1.

NOTAS
${CIERRE_CORREO}`;
}

export const REGLAS_COMUNES = [
  {
    titulo: 'El asunto empieza con [REPORTE]',
    texto:
      'La corrida filtra por ese prefijo y deja sin tocar cualquier mensaje que no lo traiga. No es decorativo.',
  },
  {
    titulo: 'El .RPT instalado va adjunto',
    texto:
      'Es la única copia válida: la suya puede traer personalizaciones que ninguna base del fabricante tiene. Sin adjunto la solicitud se rebota.',
  },
  {
    titulo: 'Un reporte por correo',
    texto:
      'Si el cambio toca una librería, se adjunta también en el mismo mensaje. Dos reportes distintos son dos correos.',
  },
  {
    titulo: 'El cuerpo va en texto plano',
    texto:
      'Pegue la plantilla tal cual. No pegue el código del reporte en el cuerpo: el correo corta los renglones largos.',
  },
  {
    titulo: 'El nombre del reporte no se repite',
    texto:
      'El guardia de duplicados rechaza una solicitud cuyo nombre choca con una ya procesada. Use una variante: "… V2", "… versión Excel".',
  },
  {
    titulo: 'Aquí no se crean reportes nuevos',
    texto:
      'Este canal modifica reportes que usted ya tiene instalados. Para un reporte desde cero, hable con su asesor.',
  },
];

export const PASOS = [
  {
    n: 1,
    titulo: 'Localice su .RPT',
    texto:
      'El archivo tal como está instalado en su equipo, con sus personalizaciones. Ese es el que se adjunta.',
  },
  {
    n: 2,
    titulo: 'Copie la plantilla de su sistema',
    texto:
      'Abajo hay una por sistema. Llene los nueve campos del encabezado y escriba sus instrucciones.',
  },
  {
    n: 3,
    titulo: 'Péguela en un correo nuevo',
    texto:
      'Al buzón del robot, con el asunto que empieza en [REPORTE] y el .RPT adjunto.',
  },
  {
    n: 4,
    titulo: 'Reciba el reporte compilado',
    texto:
      'Le responde al correo que puso en "Responder a", con el archivo y el acuse de validación.',
  },
];

export const CAMPOS_ENCABEZADO = [
  { campo: 'RFC', texto: 'El RFC que tiene créditos contratados.' },
  { campo: 'Cliente', texto: 'Nombre de su empresa, tal como lo usan ustedes.' },
  {
    campo: 'Sistema',
    texto:
      'Contabilidad, Bancos, Nominas o Comercial Premium. Exactamente uno de esos cuatro.',
  },
  {
    campo: 'Version',
    texto: 'La que reporta Ayuda › Acerca de. Se valida contra el catálogo de versiones.',
  },
  {
    campo: 'Reporte',
    texto: 'Nombre corto y único del cambio. No repita uno ya procesado.',
  },
  { campo: 'Archivo', texto: 'El .RPT tal como se llama en su instalación.' },
  {
    campo: 'Bases externas',
    texto:
      'ADD, COMPACWADMIN, Comercial… o "ninguna". Es el único dato que no se infiere del código fuente.',
  },
  { campo: 'Salida', texto: 'Excel OLE, impresión, PDF. Define el patrón de librerías.' },
  { campo: 'Responder a', texto: 'El correo donde quiere recibir el reporte terminado.' },
];

export const sistemas = [
  // ─────────────────────────────────────────────────────────── PREMIUM
  {
    id: 'premium',
    orden: 1,
    etiqueta: 'Comercial Premium',
    titulo: 'CONTPAQi® Comercial Premium',
    acento: 'aqua',
    valorSistema: 'Comercial Premium',
    filtroCreditos: ['Premium'],
    resumen:
      'Documentos, cartera, comisiones y catálogos sobre el esquema adm. Las consultas se escriben con los DECLARE/SET de sus valores de prueba.',
    particular: [
      {
        campo: 'Bases externas',
        texto:
          'Normalmente "ninguna". Se declara sólo si el reporte cruza al Almacén Digital o a otro sistema.',
      },
      {
        campo: 'Origen de cada dato',
        texto:
          'Cuando un campo existe en dos tablas —la fecha de vencimiento del pago y la del cargo, por ejemplo— hay que nombrar cuál: cargo.CFECHAVENCIMIENTO. Sin esa línea el reporte sale con datos que se ven bien y están mal.',
      },
      {
        campo: 'Lo que NO se toca',
        texto:
          'Si el reporte atiende varios selectores o varios clientes, dígalo. El punto más valioso de la validación suele ser "los demás valores salen exactamente igual que hoy".',
      },
    ],
    asunto: '[REPORTE] Nombre del reporte - SU EMPRESA',
    plantilla: `# SOLICITUD REPORTEADOR

- **RFC:** [RFC con créditos]
- **Cliente:** [NOMBRE DE SU EMPRESA]
- **Sistema:** Comercial Premium
- **Version:** [la que reporta Ayuda > Acerca de, ej. 12.1.0 SP2]
- **Reporte:** [nombre corto y unico del cambio]
- **Archivo:** [ARCHIVO.RPT tal como esta instalado]
- **Bases externas:** ninguna
- **Salida:** Excel OLE
- **Responder a:** [correo donde quiere recibirlo]

## INSTRUCCIONES

[Una linea con el estado actual: que columnas trae hoy y como sale.]

1. [Una orden por punto. Ej: Cambiar el ancho de la columna B a 12.]

2. [Si agrega una columna, diga de donde sale el dato con tabla y campo.
   Ej: la fecha de vencimiento del CARGO asociado al pago
   (cargo.CFECHAVENCIMIENTO), no la del documento de pago.
   Indique formato y ancho.]

3. [Si agrega un calculo, escriba la formula completa.
   Ej: TOTAL COMISION = (Total Abono * Comision Cobro) / 100
   Formato numerico, 2 decimales, ancho 15.
   Si hay escalones o rangos, enumerelos completos y sin huecos:
     menos de 1 dia ... 0%
     de 1 a 15 dias ... 30%
     de 16 a 45 dias .. 60%
     mas de 60 dias ... 100%]

## PARAMETROS

NO SE MODIFICAN.

[O bien: describa el parametro nuevo, su tipo y sus valores posibles.]

## CONSULTASQL

[Pegue su consulta de referencia con los DECLARE/SET de los valores que uso
 para probar. Sirve para entender de donde salen los datos: la orden va en
 INSTRUCCIONES, no aqui.]

## EJEMPLOQUERY

[Encabezado de columnas y dos o tres renglones representativos.
 De aqui salen los anchos y los tipos de columna.
 Si no lo tiene a la mano, escriba: No se anexa.]

## VALIDACION

1. [Cifra concreta. Ej: con el selector Tipo = 1 el reporte sale con 13
   columnas, en este orden: A Fecha Cobro, B Fecha Factura, ...]
2. [Lo que NO debe cambiar. Ej: los demas valores del selector (2 al 6) salen
   EXACTAMENTE igual que hoy: mismas columnas, mismos anchos, mismos totales.]
3. [Un caso de frontera. Ej: un pago aplicado el mismo dia del vencimiento
   o antes muestra 0% de penalizacion.]
4. [Un calculo verificable a ojo. Ej: con Total Abono 10,000.00 y Comision 2%,
   la columna Total Comision da 200.00.]
5. [Los subtotales y el gran total suman las columnas de importe nuevas.]
6. [Las columnas de importe llegan a Excel como numero y se pueden sumar con
   la barra de estado; no quedan como texto.]

## NOTAS

[Contexto que cambia decisiones pero no es una orden: que otros clientes usan
 el mismo reporte y no se debe mover, que no usan paneles congelados, para
 cuando lo necesita.]`,
    cuerpoCorto: cuerpoCorto('Comercial Premium', 'ninguna'),
    checklist: [
      'Asunto con [REPORTE] y un nombre que no choque con una solicitud ya procesada.',
      'Los nueve campos del encabezado, completos y en orden.',
      'El .RPT instalado, adjunto — no pegado en el cuerpo.',
      'INSTRUCCIONES numeradas, una orden por punto.',
      'De dónde sale cada dato nuevo: nombre de tabla y campo.',
      'Escalones y rangos completos, sin huecos ni traslapes.',
      'VALIDACION con cifras que se comprueban abriendo el Excel.',
      'Un punto de VALIDACION para lo que NO debe cambiar.',
    ],
    ejemplo: {
      titulo: 'Comisiones de Cobranza con Penalización',
      contexto: 'Caso real atendido en agosto de 2026. Datos sustituidos por demostración.',
      asunto: '[REPORTE] Comisiones de Cobranza con Penalizacion - EMPRESA DEMO',
      cuerpo: `# SOLICITUD REPORTEADOR

- **RFC:** XAXX010101000
- **Cliente:** EMPRESA DEMO
- **Sistema:** Comercial Premium
- **Version:** 12.1.0 SP2
- **Reporte:** Comisiones de Cobranza con Penalizacion
- **Archivo:** COMISIONES.RPT
- **Bases externas:** ninguna
- **Salida:** Excel OLE
- **Responder a:** contacto@empresademo.com

## INSTRUCCIONES

El reporte ya existe y ya sale a Excel, con subtotales por agente y estas
columnas:

   Fecha Cobro | Fecha Factura | Folio | Cliente | Concepto |
   Comision Cobro | Total Abono | Total Factura

1. Cambiar el ancho de la columna B (Fecha Factura) a 12.

2. Insertar una columna nueva **Fecha Vencimiento** despues de Fecha Factura.
   - El dato es la fecha de vencimiento del CARGO asociado al pago
     (cargo.CFECHAVENCIMIENTO), no la del documento de pago.
   - Formato texto, ancho 12.

3. Agregar cuatro columnas al final, en este orden:

   3.1 TOTAL COMISION = (Total Abono * Comision Cobro) / 100
       Formato numerico, 2 decimales, ancho 15.

   3.2 PORCENTAJE PENALIZACION, segun los dias transcurridos entre
       Fecha Vencimiento y Fecha Cobro:
         menos de 1 dia ... 0%
         de 1 a 15 dias ... 30%
         de 16 a 45 dias .. 60%
         de 46 a 60 dias .. 90%
         mas de 60 dias ... 100%
       Formato porcentaje, ancho 12.

   3.3 TOTAL PENALIZACION = Total Comision * Porcentaje Penalizacion

   3.4 COMISION NETA = Total Comision - Total Penalizacion

## PARAMETROS

NO SE MODIFICAN.

El reporte ya trae rango de fechas, rango de agentes, selector Tipo, tipo de
agente, moneda y filtro de clasificaciones de clientes.

## CONSULTASQL

DECLARE @lIdMoneda AS INT; DECLARE @lFechaIni AS DATETIME;
DECLARE @lFechaFin AS DATETIME; DECLARE @lDelAgente AS CHAR(30);
DECLARE @lAlAgente AS CHAR(30);
SET @lIdMoneda = 1; SET @lFechaIni = '20260201'; SET @lFechaFin = '20260831';
SET @lDelAgente = '0001'; SET @lAlAgente = 'A09';

SELECT AgeD.cCodigoAgente, AgeD.cNombreAgente, cteD.cRazonSocial,
       docto.cFolio, docto.cFecha, docto.cFechaVencimiento, docto.cTotal,
       AgeD.cComisionCobroAgente, asoc.CIMPORTEABONO,
       cargo.CTOTAL as totalcargo, cargo.CFECHAVENCIMIENTO
       /* … el resto de las columnas del reporte … */
FROM admDocumentos docto
LEFT JOIN admConceptos concD ON concD.cIdConceptoDocumento = docto.cIdConceptoDocumento
LEFT JOIN admClientes cteD   ON cteD.cIdClienteProveedor = docto.cIdClienteProveedor
LEFT JOIN admAgentes ageD    ON ageD.cIdAgente = docto.cIdAgente
LEFT JOIN admAsocCargosAbonos asoc ON asoc.CIDDOCUMENTOABONO = docto.CIDDOCUMENTO
LEFT JOIN admDocumentos cargo      ON cargo.cIdDocumento = asoc.CIDDOCUMENTOCARGO
WHERE docto.cAfectado = 1
  AND docto.cUsaCliente = 1
  AND docto.cIdDocumentoDe IN (9,10,12)
  AND docto.cFecha BETWEEN @lFechaIni AND @lFechaFin
  AND AgeD.cCodigoAgente BETWEEN @lDelAgente AND @lAlAgente
ORDER BY cCodigoAgente, cFecha, cSerieDocumento, cFolio

## EJEMPLOQUERY

No se anexa.

## VALIDACION

1. Con el selector Tipo = 1 el reporte sale con 13 columnas:
   A Fecha Cobro, B Fecha Factura, C Fecha Vencimiento, D Folio, E Cliente,
   F Concepto, G Comision Cobro, H Total Abono, I Total Factura,
   J Total Comision, K % Penalizacion, L Total Penalizacion, M Comision Neta.
2. Los demas valores del selector Tipo (2 al 6) salen EXACTAMENTE igual que hoy:
   mismas columnas, mismos anchos, mismos totales.
3. Un pago aplicado el mismo dia del vencimiento o antes muestra 0% de
   penalizacion.
4. Un pago con 20 dias de atraso muestra 60%.
5. En un renglon con Total Abono 10,000.00 y Comision Cobro 2%,
   la columna Total Comision da 200.00.
6. Los subtotales por agente y el gran total suman las tres columnas de importe
   nuevas. La columna de porcentaje queda vacia en los renglones de totales.
7. Las columnas de importe llegan a Excel como numero y se pueden sumar con
   la barra de estado; no quedan como texto.

## NOTAS

Este reporte solo se usa con el selector Tipo = 1. Las otras cinco opciones
estan en produccion con otros clientes y no se deben mover.

El reporte ya filtra documentos de pago (cIdDocumentoDe 9, 10 y 12); esa parte
no se toca.

En nuestros reportes de Comercial no usamos paneles congelados.

Urge para el corte de comisiones de septiembre.`,
      porQueFunciona: [
        {
          titulo: 'Dice de dónde sale cada dato',
          texto:
            '"Fecha Vencimiento" existe en el pago y en el cargo, y son fechas distintas. La solicitud nombra cuál de las dos. Sin esa línea el reporte sale con datos que se ven perfectamente bien y están mal.',
        },
        {
          titulo: 'Los escalones vienen completos y sin huecos',
          texto:
            'Menos de 1, de 1 a 15, de 16 a 45, de 46 a 60, más de 60. No queda un rango sin definir ni dos rangos encimados.',
        },
        {
          titulo: 'Protege lo que ya funciona',
          texto:
            'El punto 2 de la validación es el más importante del correo: el reporte atiende seis tipos y sólo se pidió tocar uno. Escrito así se verifica antes de entregar, en vez de descubrirse con un cliente molesto.',
        },
        {
          titulo: 'La validación se comprueba mirando el Excel',
          texto:
            '"20 días de atraso muestra 60%", "abono 10,000 al 2% da 200.00". Son números que cualquiera confirma abriendo el archivo, sin leer el código.',
        },
        {
          titulo: 'Las notas son contexto, no órdenes',
          texto:
            'Que urja para septiembre o que el reporte se use sólo con Tipo 1 no es algo que haya que programar, pero cambia decisiones. Van en NOTAS.',
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────── NOMINAS
  {
    id: 'nominas',
    orden: 2,
    etiqueta: 'Nóminas',
    titulo: 'CONTPAQi® Nóminas',
    acento: 'azul',
    valorSistema: 'Nominas',
    filtroCreditos: ['Nominas'],
    resumen:
      'Recibos, timbrado, conceptos y acumulados sobre las tablas nom100xx. El caso de prueba se amarra con ejercicio, tipo de periodo y número de periodo.',
    particular: [
      {
        campo: 'Bases externas',
        texto:
          'Casi siempre "ninguna": el timbrado ya vive en las tablas del propio sistema.',
      },
      {
        campo: 'Diga qué NO se toca',
        texto:
          '"Crear una versión nueva, el reporte de impresión se queda como está" evita la pregunta más cara de todas: si se modifica o se duplica.',
      },
      {
        campo: 'Enumere las columnas y su orden',
        texto:
          '"Mantener las columnas actuales" suena claro y no lo es: en impresión hay columnas que cambian de significado según un parámetro. Listarlas cierra esa ambigüedad.',
      },
      {
        campo: 'Caso de prueba con números',
        texto:
          'Ejercicio, tipo de periodo, periodo, concepto y el valor de cada parámetro, más el resultado esperado en renglones. Con eso se verifica la entrega antes de mandarla.',
      },
    ],
    asunto: '[REPORTE] Nombre del reporte - SU EMPRESA',
    plantilla: `# SOLICITUD REPORTEADOR

- **RFC:** [RFC con créditos]
- **Cliente:** [NOMBRE DE SU EMPRESA]
- **Sistema:** Nominas
- **Version:** [la que reporta Ayuda > Acerca de, ej. 19.3.5]
- **Reporte:** [nombre corto y unico del cambio]
- **Archivo:** [ARCHIVO.rpt tal como esta instalado]
- **Bases externas:** ninguna
- **Salida:** Excel OLE
- **Responder a:** [correo donde quiere recibirlo]

## INSTRUCCIONES

1. [Diga primero si se MODIFICA el reporte actual o se crea una VERSION nueva.
   Ej: Crear una VERSION del reporte con salida a Excel por OLE. El reporte de
   impresion actual se queda como esta: esto es un archivo aparte, no un
   reemplazo.]

2. [Enumere las columnas y su orden, aunque "sean las mismas de hoy":

   Codigo | Nombre | Departamento | RFC | CURP | Fecha de Pago |
   Fecha de Emision | Neto | Especie | UUID]

3. [Diga que hacer con las columnas que hoy cambian de significado segun un
   parametro. Ej: en Excel ya no hay limite de ancho de renglon; las cuatro
   ultimas deben salir SIEMPRE y ninguna debe cambiar de significado.]

4. [Comportamiento cuando un parametro viene vacio. Ej: la columna Especie solo
   se llena cuando se eligio concepto; si no se eligio, la columna se deja sin
   ancho y el reporte corre igual.]

5. [Totales. Ej: agregar un renglon al final con el conteo de empleados y la
   suma de Neto y Especie.]

6. [Encabezado. Ej: encabezado del fabricante en las primeras filas (empresa,
   titulo, periodo, fecha y hora) y los titulos de columna en el renglon 7.]

## PARAMETROS

NO SE MODIFICAN.

## CONSULTASQL

[Pegue la consulta de referencia con los ID reales del periodo que uso para
 probar (idperiodo, idconcepto). Sirve de contexto: la orden va arriba.]

## EJEMPLOQUERY

[Encabezado de columnas y uno o dos renglones representativos, mas el total
 de renglones y el periodo del que salieron.]

## VALIDACION

Caso de prueba: [Ejercicio, tipo de periodo, numero de periodo, concepto y el
valor de cada parametro.]

1. [Conteo esperado. Ej: el listado saca 17 renglones de empleado mas el
   renglon de totales.]
2. [Datos que deben quedar copiables. Ej: el UUID sale completo en su propia
   columna y se puede copiar de Excel a otro lado.]
3. [Tipos de dato. Ej: Neto y Especie llegan como numero: al seleccionarlos,
   Excel muestra la suma en la barra de estado. No deben quedar como texto.]
4. [Cuadre contra algo existente. Ej: la suma de Neto cuadra contra el reporte
   de impresion del mismo periodo.]
5. [El caso del parametro vacio. Ej: si se corre SIN elegir concepto de Especie,
   el reporte termina sin error y esa columna no aparece.]
6. [Lo que NO cambia. Ej: el reporte de impresion actual sigue corriendo igual
   que antes del cambio.]

## NOTAS

[Por que se esta pidiendo el cambio, que periodo estan usando para probar, y
 que hacer si la salida requiere una libreria nueva.]`,
    cuerpoCorto: cuerpoCorto('Nominas', 'ninguna'),
    checklist: [
      'Asunto con [REPORTE] y un nombre que no choque con una solicitud ya procesada.',
      'Los nueve campos del encabezado, completos y en orden.',
      'El .rpt instalado, adjunto — no pegado en el cuerpo.',
      '¿Se modifica el reporte o se crea una versión nueva? Dicho en el punto 1.',
      'Columnas enumeradas y en orden, aunque "sean las mismas".',
      'Qué pasa cuando un parámetro viene vacío.',
      'Caso de prueba: ejercicio, tipo de periodo, periodo, concepto y cada parámetro.',
      'Conteo esperado de renglones en VALIDACION.',
    ],
    ejemplo: {
      titulo: 'Recibos Timbrados, versión a Excel',
      contexto:
        'Caso real atendido en septiembre de 2026. Datos de empleado sustituidos por demostración.',
      asunto: '[REPORTE] Recibos Timbrados version Excel - EMPRESA DEMO',
      cuerpo: `# SOLICITUD REPORTEADOR

- **RFC:** XAXX010101000
- **Cliente:** EMPRESA DEMO
- **Sistema:** Nominas
- **Version:** 19.3.5
- **Reporte:** Recibos Timbrados Version Excel
- **Archivo:** RecibosTimbrados.rpt
- **Bases externas:** ninguna
- **Salida:** Excel OLE
- **Responder a:** contacto@empresademo.com

## INSTRUCCIONES

1. Crear una VERSION del reporte con salida a Excel por OLE.
   El reporte de impresion actual se queda como esta: esto es un archivo aparte,
   no un reemplazo.

2. Conservar las mismas columnas que imprime hoy, en este orden:

   Codigo | Nombre | Departamento | RFC | CURP | Fecha de Pago |
   Fecha de Emision | Neto | Especie | UUID

3. En Excel ya no hay limite de ancho de renglon. Las cuatro ultimas columnas
   deben salir SIEMPRE y ninguna debe cambiar de significado segun el parametro
   de Especie, como pasa hoy en la impresion.

4. La columna Especie solo se llena cuando se eligio concepto en los parametros.
   Si no se eligio concepto, la columna se deja sin ancho y el reporte corre igual.

5. Agregar un renglon de totales al final con el conteo de empleados y la suma
   de Neto y Especie.

6. Encabezado del fabricante en las primeras filas (empresa, titulo del reporte,
   periodo, fecha y hora) y los titulos de columna en el renglon 7.

## PARAMETROS

NO SE MODIFICAN.

## CONSULTASQL

select d1.enviado, d1.fechapago, d1.fechaemision, d1.uuid,
       d2.codigoempleado, d2.nombrelargo, d2.rfc, d2.curpi, d2.curpf,
       d3.numeroperiodo, d4.nombretipoperiodo, d1.estado,
       d5.numerodepartamento, d5.descripcion,
       d6.importetotal as neto, d7.importetotal as especie
from nom10043 d1
join nom10001 d2 on d1.idempleado = d2.idempleado
join nom10002 d3 on d1.idperiodo  = d3.idperiodo
join nom10023 d4 on d3.idtipoperiodo = d4.idtipoperiodo
join nom10003 d5 on d2.iddepartamento = d5.iddepartamento
left join nom10007 d6 on d1.idempleado = d6.idempleado
     and (d6.idperiodo = 2392 and d6.idconcepto = 1)
left join nom10007 d7 on d1.idempleado = d7.idempleado
     and (d7.idperiodo = 2392 and d7.idconcepto = 15)
where d1.estado = 3 and d1.idperiodo = 2392
order by d3.idtipoperiodo, d3.numeroperiodo, d2.codigoempleado

## EJEMPLOQUERY

enviado,fechapago,fechaemision,uuid,codigoempleado,nombrelargo,rfc,
curpi,curpf,numeroperiodo,nombretipoperiodo,estado,numerodepartamento,
descripcion,neto,especie

0,04/09/2026,04/09/2026,00000000-0000-0000-0000-000000000001,3,
EMPLEADO DEMO UNO,XEXX010101,XXXX,XXXXXXXX,36,Semanal,3,
36,ALMACEN,4098.36,NULL

(17 renglones en total; periodo 2392, Semanal 36, ejercicio 2026)

## VALIDACION

Caso de prueba: Ejercicio 2026, tipo de periodo Semanal, periodo 36,
concepto de Especie 15, pEspecie = Si, pEnviado = No, pOrden = No.

1. El listado saca 17 renglones de empleado mas el renglon de totales.
2. El UUID sale completo en su propia columna y se puede copiar de Excel a otro lado.
3. Neto y Especie llegan como numero: al seleccionarlos, Excel muestra la suma en
   la barra de estado. No deben quedar como texto.
4. El renglon de totales da 17 empleados y la suma de Neto cuadra contra el
   reporte de impresion del mismo periodo.
5. Si se corre SIN elegir concepto de Especie, el reporte termina sin error y esa
   columna no aparece.
6. Al desplazarse a la derecha hasta el UUID siguen visibles el codigo y el nombre
   del empleado.
7. El reporte de impresion actual sigue corriendo igual que antes del cambio.

## NOTAS

Hoy el reporte solo existe en impresion y ahi no caben las ultimas columnas, por
eso dos de ellas cambian de significado segun el parametro de Especie. En Excel
eso ya no hace falta.

El periodo 36 (idperiodo 2392) es el que estamos usando para probar.

Si la salida a Excel requiere una libreria nueva, entreguenla junto con el
reporte y diganme en que carpeta va cada archivo.`,
      porQueFunciona: [
        {
          titulo: 'Dice qué NO se toca',
          texto:
            '"Crear una versión nueva, el reporte de impresión se queda como está" evita la pregunta más cara de todas: si se modifica o se duplica. La validación lo vuelve a verificar en el punto 7.',
        },
        {
          titulo: 'Enumera las columnas y su orden',
          texto:
            '"Mantener las columnas actuales" suena claro y no lo es: el reporte de impresión tiene columnas que cambian de significado según un parámetro. Listarlas cierra esa ambigüedad.',
        },
        {
          titulo: 'Trae un caso de prueba con números',
          texto:
            'Ejercicio, tipo de periodo, periodo, concepto y el valor de cada parámetro, más el resultado esperado: 17 renglones. Con eso se verifica la entrega antes de mandarla.',
        },
        {
          titulo: 'Distingue lo que se ve de lo que se programa',
          texto:
            '"Neto y Especie suman en la barra de estado" es un criterio que comprueba cualquiera abriendo el archivo. Es mucho más útil que pedir un formato numérico específico.',
        },
        {
          titulo: 'El SQL y el CSV son contexto, no la orden',
          texto:
            'Sirven para entender de dónde salen los datos y con qué se está comparando. Lo que hay que hacer está en INSTRUCCIONES.',
        },
      ],
      costo:
        'Este reporte necesitó tres entregas. La primera no compiló; la segunda compiló y generó un Excel con una sola columna llena. Las dos veces el defecto se descubrió hasta que alguien lo probó a mano. Un criterio de aceptación escrito convierte eso en algo que se verifica antes de entregar.',
    },
  },

  // ─────────────────────────────────────────── CONTABILIDAD Y BANCOS
  {
    id: 'contabilidad',
    orden: 3,
    etiqueta: 'Contabilidad y Bancos',
    titulo: 'CONTPAQi® Contabilidad y Bancos',
    acento: 'morado',
    valorSistema: 'Contabilidad',
    filtroCreditos: ['Contabilidad', 'Bancos'],
    resumen:
      'Pólizas, auxiliares, balanzas, conciliaciones y el cruce con el Almacén Digital. La conexión es nativa; lo que hay que declarar son las bases externas.',
    particular: [
      {
        campo: 'Bases externas: ADD',
        texto:
          'En cuanto la instrucción mencione UUID, XML, impuestos del comprobante o cancelación. Es el único dato que no se infiere del código fuente: sin declararlo, la corrida se arriesga a inventar el origen de datos. COMPACWADMIN o Comercial cuando se cruza el puente entre sistemas.',
      },
      {
        campo: 'Salida: Excel OLE',
        texto:
          'Activa un patrón distinto al de Nóminas: la librería es BibliotecaExcel.rpt, el Incluye va después de FinParametros porque abre Excel al cargarse, y el reporte debe poner Excel.Visible porque la librería nunca lo hace.',
      },
      {
        campo: 'No se piden Librerias ni Carpeta',
        texto:
          'Se respetan los Incluye que ya trae el fuente. No se homogeneizan ni se retiran los Incluye del cliente aunque queden sin uso tras un refactor. Agregar uno nuevo sí se permite: es alta, no modificación.',
      },
      {
        campo: 'VALIDACION es obligatoria aquí',
        texto:
          'Es opcional en el formato y en Contabilidad es la que hay que escribir siempre. Si un parámetro cambia el SQL, se piden probadas las dos ramas: una rama condicional del query es código que el compilador nunca ejerce.',
      },
    ],
    asunto: '[REPORTE] Nombre del reporte - SU EMPRESA',
    plantilla: `# SOLICITUD REPORTEADOR

- **RFC:** [RFC con créditos]
- **Cliente:** [NOMBRE DE SU EMPRESA]
- **Sistema:** Contabilidad
- **Version:** [la que reporta Ayuda > Acerca de, ej. 19.2.0]
- **Reporte:** [nombre corto y unico del cambio]
- **Archivo:** [ARCHIVO.rpt tal como esta instalado]
- **Bases externas:** ADD
- **Salida:** Excel OLE
- **Responder a:** [correo donde quiere recibirlo]

## INSTRUCCIONES

1. [Una orden por punto, numeradas.
   Ej: Refactorizar codigo, esto incluye eliminar todo el codigo no utilizado.]

2. [Ej: Cambiar la salida completamente a Excel con OLE.]

3. [Enumere las columnas que deben quedar, en orden:
   Folio | Fecha | Abonos | Concepto | UUID | Tipo Comprobante | Total |
   Moneda | Regimen | FP | MP | RFC | Proveedor | Fecha XML | Impuesto |
   Retencion]

4. [Tipos de dato por columna. Ej: Abono, Total, Impuesto y Retencion son tipo
   numerico con dos decimales; las demas son tipo texto.]

5. [Anchos. Ej: ajustar la anchura de las columnas validando el tipo de dato y
   la informacion de EJEMPLOQUERY.]

6. [Si hay varias consultas encadenadas que deben colapsarse, dígalo aquí.]

## PARAMETROS

NO SE MODIFICAN.

## CONSULTASQL

[Pegue la consulta principal. Si un parametro cambia el SQL, ponga TAMBIEN la
 otra rama, marcada con un comentario:
 -- Sin marcar PPD
 ...
 -- Marcando PPD: el mismo query mas
 --   and tipocomprobante='I' and metodopago='PPD']

## EJEMPLOQUERY

[Encabezado de columnas y renglones representativos, y diga cual es el valor
 mas largo de la muestra: de ahi salen los anchos. Evita tener que adjuntar CSV.]

## VALIDACION

1. Caso de prueba: [Ejercicio y periodo concretos.]
   1.1 [Conteo esperado en la rama A. Ej: sin marcar PPD se generan 12 registros.]
   1.2 [Conteo esperado en la rama B. Ej: marcando PPD se generan 8 registros
        pero solo uno se imprime, al encontrar PPD sin asociar.]

## NOTAS

[Contexto: de que tabla sale la conexion al Almacen Digital, por que el usuario
 necesita esas columnas, y si hay llamados a bibliotecas que NO deben
 modificarse por ser codigo personalizado y no del fabricante.]`,
    cuerpoCorto: cuerpoCorto('Contabilidad', 'ADD'),
    checklist: [
      'Asunto con [REPORTE] y un nombre que no choque con una solicitud ya procesada.',
      'Los nueve campos del encabezado, completos y en orden.',
      'Bases externas: ADD si se toca el Almacén Digital (UUID, XML, impuestos, cancelación).',
      'El .rpt instalado, adjunto — no pegado en el cuerpo.',
      'INSTRUCCIONES numeradas, una orden por punto.',
      'EJEMPLOQUERY con encabezado y renglones representativos: de ahí salen anchos y tipos.',
      'VALIDACION con cifras concretas y el caso de prueba (ejercicio y periodo).',
      'Si un parámetro cambia el SQL, las dos ramas se piden probadas en VALIDACION.',
    ],
    ejemplo: {
      titulo: 'Pólizas y UUID',
      contexto:
        'Caso real validado el 14 de septiembre de 2026. Proveedores y UUID sustituidos por demostración.',
      asunto: '[REPORTE] Polizas y UUID - EMPRESA DEMO',
      cuerpo: `# SOLICITUD REPORTEADOR

- **RFC:** XAXX010101000
- **Cliente:** EMPRESA DEMO
- **Sistema:** Contabilidad
- **Version:** 19.2.0
- **Reporte:** Polizas y UUID V3
- **Archivo:** PolizasyUUID.rpt
- **Bases externas:** ADD
- **Salida:** Excel OLE
- **Responder a:** contacto@empresademo.com

## INSTRUCCIONES
1. Refactorizar codigo, esto incluye eliminar todo el codigo no utilizado.
2. Cambiar la salida completamente a Excel con OLE.
3. Conservar las mismas columnas que se generan hoy: Folio | Fecha | Abonos |
   Concepto | UUID | Tipo Comprobante | Total | Moneda | Regimen | FP | MP |
   RFC | Proveedor | Fecha XML | Impuesto | Retencion.
4. Las columnas Abono, Total, Impuesto y Retencion son tipo numerico con dos
   decimales; las demas son tipo texto.
5. Ajustar la anchura de las columnas validando el tipo de dato y la
   informacion de EJEMPLOQUERY.
6. Al seleccionar la opcion PPD se utilizan 4 querys para todo el proceso; se
   debe refactorizar esa seccion y colapsarla en un solo query.

## PARAMETROS
NO SE MODIFICAN.

## CONSULTASQL
-- Sin marcar PPD
select p.tipopol, p.folio, p.fecha, p.abonos, p.Concepto, p.guid,
       isnull(c.uuid,'') as uuid,
       isnull(cfdi.TipoComprobante,'') as TipoComprobante,
       isnull(cfdi.Total,0) as Total, isnull(cfdi.moneda,'') as moneda,
       isnull(cfdi.TotImpTraslado,0) as impuesto,
       isnull(cfdi.TotImpRetenidos,0) as retenido,
       isnull(cfdi.regimenemisor,'') as regimenemisor,
       isnull(cfdi.formapago,'') as formapago,
       isnull(cfdi.rfcemisor,'') as rfcemisor,
       isnull(cfdi.nombreemisor,'') as nombreemisor,
       cfdi.metodopago, cfdi.fecha as fechaxml, sat.nombre
  from polizas p
  left join asoccfdis c on c.GuidRef = p.Guid
  left join [document_<guiddsl>_metadata]..Comprobante cfdi on cfdi.UUID = c.UUID
  join TiposPolizas sat on sat.Codigo = p.tipopol
 where p.ejercicio = 2026 and p.periodo = 8 and sat.idtipopolizasat = 2
 order by p.Fecha, p.Folio, cfdi.TipoComprobante

-- Marcando PPD: el mismo query mas
--   and tipocomprobante='I' and metodopago='PPD'
-- y en cadena, por renglon, los tres siguientes (son los que hay que colapsar):
-- QUERY 2  select * from [...]..PAGOS_DOC_REL where IdDocumento='<uuid>'
-- QUERY 3  select UUID from [...]..Comprobante where guiddocument='<guid>'
-- QUERY 4  select * from [...]..Documento where guiddocument='<guid>'
--            and MetadataEstatusApp!='Cancelado' and CancelStatus!='Cancelado'

## EJEMPLOQUERY
Encabezado de las dos muestras:
tipopol,folio,fecha,abonos,Concepto,guid,uuid,TipoComprobante,Total,moneda,
impuesto,retenido,regimenemisor,formapago,rfcemisor,nombreemisor,metodopago,
fechaxml,nombre

SIN MARCAR PPD (12 renglones). Renglones representativos:
2,1,2026-08-03,321.62,PROVEEDOR DEMO UNO,
00000000-0000-0000-0000-0000000000A1,00000000-0000-0000-0000-0000000000B1,I,
300.000000,MXN,21.620000,0.000000,601,28,XAXX010101000,PROVEEDOR DEMO
UNO,PUE,2026-08-06 06:19:14.000,Egresos
2,182,2026-08-28,743,PROVEEDOR DEMO DOS,00000000-0000-0000-0000-0000000000A2,
00000000-0000-0000-0000-0000000000B2,I,860.800000,MXN,118.730000,0.000000,601,
99,XEXX010101000,PROVEEDOR DEMO DOS,PPD,2026-08-20 04:43:10.000,Egresos
2,182,2026-08-28,743,PROVEEDOR DEMO DOS,00000000-0000-0000-0000-0000000000A2,
00000000-0000-0000-0000-0000000000B3,P,0.000000,XXX,0.000000,0.000000,601,,
XEXX010101000,PROVEEDOR DEMO DOS,,2026-08-25 08:01:00.000,Egresos

MARCANDO PPD (8 renglones): cuatro folios distintos y cuatro renglones de un
mismo folio.

El valor mas largo de la muestra es un Concepto de ~100 caracteres. De ahi
salen los anchos: Concepto 45, Proveedor 32, UUID y UUID Pago 38.

QUERY 2 devuelve DOS documentos de pago para el mismo IdDocumento.

## VALIDACION
1. Caso de prueba Ejercicio 2026, periodo 8.
   1.1 Sin marcar PPD se generan 12 registros.
   1.2 Marcando PPD se generan 8 registros pero solo uno se imprime, al
       encontrar PPD sin asociar.

## NOTAS
Este reporte usa el campo GUIDDSL de la tabla parametros para conectarse a las
tablas del almacen digital.
Caso sin marcar PPD: para el usuario es muy importante conocer la mayor
informacion posible del XML asociado a las polizas; es posible que con el uso
se requieran mas columnas.
Caso marcando PPD: es el grupo de querys sin concatenar que deben optimizarse.
Los llamados a las bibliotecas no deben modificarse: es codigo personalizado,
no del fabricante.`,
      porQueFunciona: [
        {
          titulo: 'Declara las bases externas',
          texto:
            'En cuanto la instrucción menciona UUID, XML o impuestos del comprobante, "Bases externas: ADD" deja de ser opcional. Es el único dato que no se deduce leyendo el código fuente.',
        },
        {
          titulo: 'La VALIDACION trae las dos ramas',
          texto:
            '12 renglones sin PPD; 8 generados y 1 impreso con PPD. Son los dos números que permitieron cerrar el caso, y el reporte entregado imprime un acuse "renglones generados: N — escritos en Excel: M" justamente para compararlos de un vistazo.',
        },
        {
          titulo: 'Una rama condicional es código que nadie ejerce',
          texto:
            'La primera versión compiló limpia y corrió perfecto sin PPD, y murió al ejecutar con PPD marcado. El compilador no ve el SQL. Por eso, si un parámetro cambia la consulta, se piden probadas las dos ramas.',
        },
        {
          titulo: 'Los anchos salen del EJEMPLOQUERY',
          texto:
            'Decir cuál es el valor más largo de la muestra evita adjuntar CSV y evita una entrega con columnas cortadas.',
        },
        {
          titulo: 'Regla práctica para separar secciones',
          texto:
            'Si la frase empieza con "debe quedar", "tiene que" o "se verifica con", es VALIDACION. Si es contexto que no se programa, es NOTAS.',
        },
      ],
    },
  },
];

export default sistemas;
