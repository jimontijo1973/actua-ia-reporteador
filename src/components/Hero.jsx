// src/components/Hero.jsx
import React from 'react';
import { Mail, ArrowDown, Info, Paperclip } from 'lucide-react';
import site from '../config/site';
import sistemas from '../data/plantillas';

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Resplandores de fondo — el overflow-hidden del <section> es obligatorio */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-aqua-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-morado-500/20 blur-3xl"
      />

      <div className="contenedor relative grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-aqua-500/30 bg-aqua-500/10 px-3 py-1 text-xs font-semibold text-aqua-300">
            <span className="h-1.5 w-1.5 rounded-full bg-aqua-400" />
            {site.distintivo}
          </span>

          <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Sus reportes de CONTPAQi®,
            <br className="hidden sm:block" />{' '}
            <span className="bg-gradient-to-r from-aqua-400 via-azul-300 to-morado-300 bg-clip-text text-transparent">
              modificados por correo.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Escriba a un buzón, adjunte el <code className="font-mono text-slate-200">.RPT</code>{' '}
            que tiene instalado y describa el cambio con la plantilla de su sistema. El
            robot lo desarrolla, lo compila y se lo devuelve por correo.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#sistemas"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-aqua-500 px-6 py-3.5 font-display text-sm font-bold text-noche-900 transition hover:bg-aqua-400"
            >
              Ver la plantilla de mi sistema
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${site.buzon}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-display text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              <span className="[overflow-wrap:anywhere]">{site.buzon}</span>
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Paperclip className="h-3.5 w-3.5 text-aqua-400" />
              El asunto empieza con{' '}
              <code className="font-mono text-slate-200">[REPORTE]</code>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Paperclip className="h-3.5 w-3.5 text-aqua-400" />
              Un reporte por correo, con su .RPT adjunto
            </span>
          </div>
        </div>

        {/* Aviso del cambio de canal */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              <div>
                <h2 className="font-display text-base font-bold text-white">
                  El formulario en línea se retiró
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  En las pruebas, ni el formulario propio ni el embebido de Notion lograron
                  recibir de forma confiable el código de los reportes: los textos largos se
                  cortaban y los archivos no siempre llegaban completos.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  El correo no tiene ese problema: acepta adjuntos reales, no impone tope de
                  captura y le deja a usted una copia de lo que pidió.{' '}
                  <strong className="text-white">
                    Toda solicitud entra por {site.buzon}.
                  </strong>
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
              {sistemas.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-2.5 text-center text-[11px] font-semibold leading-tight text-slate-300 transition hover:border-white/25 hover:text-white"
                >
                  {s.etiqueta}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
