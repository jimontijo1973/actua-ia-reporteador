// src/lib/copiar.js
// Copia al portapapeles con respaldo para navegadores sin la API asíncrona
// (o cuando la página no se sirve por HTTPS).

export async function copiarTexto(texto) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texto);
      return true;
    }
  } catch (e) {
    // cae al respaldo
  }

  try {
    const area = document.createElement('textarea');
    area.value = texto;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-1000px';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, area.value.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch (e) {
    return false;
  }
}

export default copiarTexto;
