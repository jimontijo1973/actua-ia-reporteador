// src/lib/acentos.js
// Tailwind no admite clases construidas en tiempo de ejecución: el mapa va completo.

export const ACENTOS = {
  aqua: {
    texto: 'text-aqua-300',
    textoFuerte: 'text-aqua-400',
    borde: 'border-aqua-500/40',
    bordeSuave: 'border-aqua-500/20',
    fondo: 'bg-aqua-500/10',
    fondoSolido: 'bg-aqua-500',
    hoverSolido: 'hover:bg-aqua-400',
    anillo: 'focus:ring-aqua-500/50',
    resplandor: 'bg-aqua-500/20',
    barra: 'from-aqua-400 to-aqua-600',
    chip: 'bg-aqua-500/15 text-aqua-300 border-aqua-500/30',
  },
  azul: {
    texto: 'text-azul-300',
    textoFuerte: 'text-azul-400',
    borde: 'border-azul-500/40',
    bordeSuave: 'border-azul-500/20',
    fondo: 'bg-azul-500/10',
    fondoSolido: 'bg-azul-500',
    hoverSolido: 'hover:bg-azul-400',
    anillo: 'focus:ring-azul-500/50',
    resplandor: 'bg-azul-500/20',
    barra: 'from-azul-300 to-azul-600',
    chip: 'bg-azul-500/15 text-azul-300 border-azul-500/30',
  },
  morado: {
    texto: 'text-morado-300',
    textoFuerte: 'text-morado-400',
    borde: 'border-morado-500/40',
    bordeSuave: 'border-morado-500/20',
    fondo: 'bg-morado-500/10',
    fondoSolido: 'bg-morado-500',
    hoverSolido: 'hover:bg-morado-400',
    anillo: 'focus:ring-morado-500/50',
    resplandor: 'bg-morado-500/20',
    barra: 'from-morado-300 to-morado-600',
    chip: 'bg-morado-500/15 text-morado-300 border-morado-500/30',
  },
};

export const acento = (nombre) => ACENTOS[nombre] || ACENTOS.aqua;
export default acento;
