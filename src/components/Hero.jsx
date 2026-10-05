// src/components/Hero.jsx
import React from 'react';
import { Mail, ArrowDown, ArrowRight, Paperclip } from 'lucide-react';
import site from '../config/site';
import Nuevo from './Nuevo';

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

          <a
            href="#servicio"
            className="mt-3 flex w-fit max-w-full items-center gap-2 rounded-full border border-morado-500/40 bg-morado-500/10 py-1.5 pl-2 pr-3 text-xs font-semibold text-morado-300 transition hover:bg-morado-500/20"
          >
            <Nuevo />
            <span>
              ¿No sabe qué reporte pedir? Empiece con un{' '}
              <span className="font-mono">[DIAGNOSTICO]</span>
            </span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </a>

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
              <code className="font-mono text-slate-200">[REPORTE]</code> o{' '}
              <code className="font-mono text-slate-200">[DIAGNOSTICO]</code>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Paperclip className="h-3.5 w-3.5 text-aqua-400" />
              Un reporte por correo, con su .RPT adjunto
            </span>
          </div>
        </div>

        {/* Robot */}
        <div className="lg:col-span-5">
          <figure className="mx-auto w-full max-w-[300px] lg:max-w-[340px]">
            <div className="overflow-hidden rounded-[28px] bg-[#F2F7FB] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.75)]">
              <img
                src="./brand/robot.webp"
                width="340"
                height="469"
                alt="El robot de Actualízate-IA, todavía sin nombre"
                className="block h-auto w-full"
                fetchpriority="high"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs leading-relaxed text-slate-400">
              El robot que procesa sus solicitudes aún no tiene nombre.{' '}
              <a
                href={site.bautizoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-aqua-300 underline-offset-2 transition hover:text-aqua-400 hover:underline"
              >
                Vote en el bautizo
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
