// src/components/SeccionSistema.jsx
import React, { useState } from 'react';
import {
  CheckSquare,
  Lightbulb,
  FileCode2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from 'lucide-react';
import BloqueCopiable from './BloqueCopiable';
import BotonCorreo from './BotonCorreo';
import ExploradorCreditos from './ExploradorCreditos';
import { acento } from '../lib/acentos';
import site from '../config/site';

export default function SeccionSistema({ sistema, indice }) {
  const a = acento(sistema.acento);
  const [verEjemplo, setVerEjemplo] = useState(false);

  const asuntoEjemplo = `${site.prefijoAsunto} [nombre del reporte] - [SU EMPRESA]`;

  return (
    <section
      id={sistema.id}
      className="relative overflow-hidden border-t border-white/10 py-14 sm:py-20"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-40 top-24 h-80 w-80 rounded-full ${a.resplandor} blur-3xl`}
      />

      <div className="contenedor relative">
        {/* Encabezado de la sección */}
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${a.borde} ${a.fondo} font-display text-sm font-bold ${a.texto}`}
          >
            {indice}
          </span>
          <p className={`etiqueta-seccion ${a.texto}`}>Sistema {indice} de 3</p>
        </div>

        <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {sistema.titulo}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-400">
          {sistema.resumen}
        </p>
        <div className={`mt-5 h-0.5 w-24 rounded-full bg-gradient-to-r ${a.barra}`} />

        {/* Lo particular de este sistema */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {sistema.particular.map((p) => (
            <div key={p.campo} className={`rounded-2xl border ${a.bordeSuave} bg-white/[0.02] p-5`}>
              <div className="flex items-start gap-3">
                <Lightbulb className={`mt-0.5 h-4 w-4 shrink-0 ${a.texto}`} />
                <div>
                  <h3 className="font-display text-sm font-bold text-white">{p.campo}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.texto}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Asunto + plantilla + CTA */}
        <div className="mt-10 grid grid-cols-1 gap-5">
          <BloqueCopiable
            color={sistema.acento}
            titulo="Asunto del correo"
            descripcion="Reemplace lo que va entre corchetes. El prefijo no se toca."
            texto={asuntoEjemplo}
            alturaMaxima="max-h-24"
            etiquetaCopiar="Copiar asunto"
          />

          <BloqueCopiable
            color={sistema.acento}
            titulo="Cuerpo del correo — plantilla para copiar"
            descripcion="Llene los nueve campos del encabezado y sustituya los textos entre corchetes."
            texto={sistema.plantilla}
            alturaMaxima="max-h-[32rem]"
            etiquetaCopiar="Copiar plantilla"
          />

          <BotonCorreo sistema={sistema} />
        </div>

        {/* Ejemplo real */}
        <div className="mt-10">
          <button
            type="button"
            onClick={() => setVerEjemplo((v) => !v)}
            className={`flex w-full items-center justify-between gap-4 rounded-2xl border ${a.bordeSuave} bg-white/[0.02] p-5 text-left transition hover:bg-white/[0.05]`}
          >
            <div className="flex items-start gap-3">
              <FileCode2 className={`mt-0.5 h-5 w-5 shrink-0 ${a.texto}`} />
              <div>
                <h3 className="font-display text-base font-bold text-white">
                  Ejemplo real: {sistema.ejemplo.titulo}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{sistema.ejemplo.contexto}</p>
              </div>
            </div>
            {verEjemplo ? (
              <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" />
            ) : (
              <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
            )}
          </button>

          {verEjemplo && (
            <div className="mt-5 grid grid-cols-1 gap-5">
              <BloqueCopiable
                color={sistema.acento}
                titulo="Asunto"
                texto={sistema.ejemplo.asunto}
                alturaMaxima="max-h-24"
                etiquetaCopiar="Copiar"
              />
              <BloqueCopiable
                color={sistema.acento}
                titulo="Cuerpo completo de la solicitud"
                descripcion="Tal como se envió, con los datos identificables sustituidos."
                texto={sistema.ejemplo.cuerpo}
                alturaMaxima="max-h-[34rem]"
                etiquetaCopiar="Copiar"
              />

              <div className="tarjeta">
                <h4 className="font-display text-sm font-bold text-white">
                  Por qué esta solicitud funciona
                </h4>
                <ul className="mt-4 space-y-4">
                  {sistema.ejemplo.porQueFunciona.map((r) => (
                    <li key={r.titulo} className="flex items-start gap-3">
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${a.fondoSolido}`}
                      />
                      <p className="text-sm leading-relaxed text-slate-400">
                        <strong className="font-semibold text-white">{r.titulo}.</strong>{' '}
                        {r.texto}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {sistema.ejemplo.costo && (
                <div className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                    <div>
                      <h4 className="font-display text-sm font-bold text-white">
                        Lo que cuesta no escribir la VALIDACION
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                        {sistema.ejemplo.costo}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Checklist */}
        <div className="mt-10 tarjeta">
          <div className="flex items-center gap-2">
            <CheckSquare className={`h-4 w-4 ${a.texto}`} />
            <h3 className="font-display text-sm font-bold text-white">
              Antes de enviar su solicitud de {sistema.etiqueta}
            </h3>
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
            {sistema.checklist.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-slate-400">
                <span
                  className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full border ${a.borde}`}
                />
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Catálogo de créditos filtrado por este sistema */}
        <div className="mt-10">
          <ExploradorCreditos sistemas={sistema.filtroCreditos} color={sistema.acento} />
        </div>
      </div>
    </section>
  );
}
