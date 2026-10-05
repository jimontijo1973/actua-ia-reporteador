// src/config/site.js
// Único lugar donde se editan datos de contacto, correos y textos de marca.

export const site = {
  nombre: 'ACTUA-IA',
  subtitulo: 'Robot Reporteador CONTPAQi®',
  razonSocial: 'ACTUALIZATE YA, S. de R.L. de C.V.', // TODO: confirmar con contador
  distintivo: 'Distribuidor Máster CONTPAQi®',

  // Buzón de intake del robot. El asunto DEBE empezar con [REPORTE] o [DIAGNOSTICO].
  buzon: 'chip@actualizate-ia.com.mx',
  prefijoAsunto: '[REPORTE]',
  prefijoDiagnostico: '[DIAGNOSTICO]',

  // La etiqueta NUEVO del Diagnóstico se apaga sola en esta fecha (hora local del visitante).
  nuevoHasta: '2026-11-01',

  // Sitio donde se vota el nombre del robot (el robot del Hero sostiene el letrero "MI NOMBRE ?").
  bautizoUrl: 'https://actua-ia-bautizo.vercel.app/',

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

// true mientras no llegue site.nuevoHasta
export const esNuevo = () => new Date() < new Date(`${site.nuevoHasta}T00:00:00`);

export default site;
