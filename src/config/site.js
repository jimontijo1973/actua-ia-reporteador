// src/config/site.js
// Único lugar donde se editan datos de contacto, correos y textos de marca.

export const site = {
  nombre: 'ACYA-BOT',
  subtitulo: 'Robot Reporteador CONTPAQi®',
  razonSocial: 'ACTUALIZATE YA, S. de R.L. de C.V.', // TODO: confirmar con contador
  distintivo: 'Distribuidor Platino CONTPAQi®',

  // Buzón público de ACYA-BOT. El asunto DEBE empezar con [REPORTE] o [DIAGNOSTICO].
  // (chip@ y acya-bot@ son alias del mismo buzón y también reciben, pero no se publican.)
  buzon: 'acyabot@actualizate-ia.com.mx',
  prefijoAsunto: '[REPORTE]',
  prefijoDiagnostico: '[DIAGNOSTICO]',

  // La etiqueta NUEVO se apaga sola en estas fechas (hora local del visitante).
  nuevoHasta: '2026-11-01', // [DIAGNOSTICO]
  nuevoCorreccionHasta: '2027-01-01', // Corrección

  // Información y soporte (bajo la imagen del robot).
  recursos: {
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLBTXUmrlHQBc',
    whatsappCanal: 'https://chat.whatsapp.com/IEkyPbKIMqx5MduZtmtxn4',
  },

  contacto: {
    telefono: '686 841 8800',
    telefonoAlterno: '686 841 2430',
    whatsappSoporte: '5216861131644',
    whatsappVentas: '5216861131648',
    correoSoporte: 'soporte@actualizate-ia.com.mx',
    correoVentas: 'ventas@actualizate-ia.com.mx',
    horario: 'Lunes a viernes de 8:00 a 18:00 h',
    domicilio:
      'Av. Plan de Guadalupe #1600, Fracc. El Lienzo, C.P. 21258, Mexicali, B.C.',
  },

  creditosActualizados: '14 de septiembre de 2026',
};

// true mientras no llegue la fecha indicada (por omisión, site.nuevoHasta)
export const esNuevo = (hasta = site.nuevoHasta) => new Date() < new Date(`${hasta}T00:00:00`);

export default site;
