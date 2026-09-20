// src/components/BloqueCopiable.jsx
import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import copiarTexto from '../lib/copiar';
import { acento } from '../lib/acentos';

export default function BloqueCopiable({
  titulo,
  descripcion,
  texto,
  color = 'aqua',
  alturaMaxima = 'max-h-[26rem]',
  plegable = false,
  etiquetaCopiar = 'Copiar',
}) {
  const [copiado, setCopiado] = useState(false);
  const [abierto, setAbierto] = useState(!plegable);
  const a = acento(color);

  async function alCopiar() {
    const ok = await copiarTexto(texto);
    if (ok) {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    }
  }

  return (
    <div className={`overflow-hidden rounded-xl border ${a.bordeSuave} bg-noche-900/70`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="min-w-0">
          <p className="font-display text-sm font-bold text-white">{titulo}</p>
          {descripcion && (
            <p className="mt-0.5 text-xs text-slate-400">{descripcion}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {plegable && (
            <button
              type="button"
              onClick={() => setAbierto((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-white/30 hover:text-white"
            >
              {abierto ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" /> Ocultar
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" /> Ver
                </>
              )}
            </button>
          )}
          <button
            type="button"
            onClick={alCopiar}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus:ring-2 ${
              copiado
                ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
                : `${a.borde} ${a.fondo} ${a.texto} hover:brightness-125 ${a.anillo}`
            }`}
            aria-live="polite"
          >
            {copiado ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copiado
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> {etiquetaCopiar}
              </>
            )}
          </button>
        </div>
      </div>

      {abierto && (
        <pre
          className={`scroll-fino overflow-auto ${alturaMaxima} px-4 py-4 text-[12.5px] leading-relaxed text-slate-300`}
        >
          <code className="font-mono whitespace-pre">{texto}</code>
        </pre>
      )}
    </div>
  );
}
