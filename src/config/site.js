// src/config/site.js
// Único lugar donde se editan datos de contacto, correos y textos de marca.

export const site = {
  nombre: 'ACTUA-IA',
  subtitulo: 'Robot Reporteador CONTPAQi®',
  razonSocial: 'ACTUALIZATE YA, S. de R.L. de C.V.', // TODO: confirmar con contador
  distintivo: 'Distribuidor Máster CONTPAQi®',

  // Buzón de intake del robot. El asunto DEBE empezar con [REPORTE].
  buzon: 'chip@actualizate-ia.com.mx',
  prefijoAsunto: '[REPORTE]',

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

export default site;
