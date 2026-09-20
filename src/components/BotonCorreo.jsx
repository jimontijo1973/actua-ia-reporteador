// src/components/BotonCorreo.jsx
import React, { useState } from 'react';
import { Mail, Paperclip, Check, Copy } from 'lucide-react';
import site from '../config/site';
import copiarTexto from '../lib/copiar';
import { acento } from '../lib/acentos';

/**
 * mailto: abre el cliente de correo predeterminado con destinatario, asunto y
 * cuerpo ya escritos. Dos límites del protocolo, no de esta página:
 *  - ninguna web puede adjuntar un archivo por mailto; el .RPT lo adjunta el usuario;
 *  - Outlook de escritorio trunca la URL alrededor de los 2,000 caracteres.
 * Por eso el botón abre el esqueleto corto y, al lado, se copia la plantilla completa.
 */
export default function BotonCorreo({ sistema }) {
  const a = acento(sistema.acento);
  const [copiado, setCopiado] = useState(false);

  const asunto = `${site.prefijoAsunto} ${sistema.valorSistema} - `;
  const mailto = `mailto:${site.buzon}?subject=${encodeURIComponent(
    asunto
  )}&body=${encodeURIComponent(sistema.cuerpoCorto)}`;

  async function copiarCompleta() {
    const ok = await copiarTexto(sistema.plantilla);
    if (ok) {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    }
  }

  return (
    <div className={`rounded-xl border ${a.borde} ${a.fondo} p-4 sm:p-5`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={mailto}
          className={`inline-flex items-center justify-center gap-2 rounded-xl ${a.fondoSolido} ${a.hoverSolido} px-5 py-3 font-display text-sm font-bold text-noche-900 transition focus:outline-none focus:ring-2 focus:ring-white/40`}
        >
          <Mail className="h-4 w-4" />
          Abrir en mi correo
        </a>

        <button
          type="button"
          onClick={copiarCompleta}
          className={`inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-display text-sm font-bold transition hover:border-white/40 hover:bg-white/10 ${
            copiado ? 'text-emerald-300' : 'text-white'
          }`}
        >
          {copiado ? (
            <>
              <Check className="h-4 w-4" /> Plantilla copiada
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copiar plantilla completa
            </>
          )}
        </button>
      </div>

      <div className="mt-4 space-y-2 text-xs leading-relaxed text-slate-400">
        <p className="flex gap-2">
          <Paperclip className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${a.texto}`} />
          <span>
            El botón deja el correo abierto con el destinatario y el asunto listos, más el
            esqueleto de la solicitud.{' '}
            <strong className="text-slate-200">
              Pegue encima la plantilla completa y adjunte su archivo .RPT
            </strong>{' '}
            antes de enviar: ninguna página web puede adjuntar archivos por usted.
          </span>
        </p>
        <p className="pl-[1.375rem]">
          ¿No se abre nada? Su equipo no tiene un cliente de correo configurado. Copie la
          plantilla y escriba a{' '}
          <span className="font-mono text-slate-300">{site.buzon}</span> desde el correo
          que use normalmente.
        </p>
      </div>
    </div>
  );
}
