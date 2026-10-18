// src/components/SeccionCorreccion.jsx
// Servicio Corrección (sustituye al [DIAGNOSTICO] tipo 3). Contenido en data/correccion.js.
import React, { useState } from 'react';
import {
  Bug,
  BadgeCheck,
  Coins,
  CalendarClock,
  Info,
  AlertTriangle,
  FileCode2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import BloqueCopiable from './BloqueCopiable';
import BotonCorreo from './BotonCorreo';
import Nuevo from './Nuevo';
import { acento } from '../lib/acentos';
import site from '../config/site';
import {
  INTRO,
  BENEFICIOS,
  PASOS,
  CAMPOS,
  ASUNTO,
  PLANTILLA,
  CUERPO_CORTO,
  EJEMPLO,
  IMPORTANTE,
} from '../data/correccion';

const ICONO_BENEFICIO = [BadgeCheck, Coins, CalendarClock];

const CORREO = {
  acento: 'azul',
  plantilla: PLANTILLA,
  cuerpoCorto: CUERPO_CORTO,
  asuntoMailto: `${site.prefijoAsunto}  - correccion`,
  textoAdjunto: 'Pegue encima la plantilla completa y adjunte el .rpt que ejecutó',
};

export default function SeccionCorreccion() {
  const [verEjemplo, setVerEjemplo] = useState(false);
  const a = acento('azul');
  const nuevo = <Nuevo hasta={site.nuevoCorreccionHasta} />;

  return (
    <section
      id="correccion"
      className="relative overflow-hidden border-t border-white/10 py-14 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 h-80 w-80 rounded-full bg-azul-500/15 blur-3xl"
      />

      <div className="contenedor relative">
        <div className="flex items-center gap-2">
          <p className="etiqueta-seccion text-azul-300">Corrección</p>
          {nuevo}
        </div>
        <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {INTRO.titulo}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-400">{INTRO.texto}</p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {BENEFICIOS.map((b, i) => {
            const Icono = ICONO_BENEFICIO[i];
            return (
              <div key={b.titulo} className={`rounded-2xl border ${a.bordeSuave} ${a.fondo} p-5`}>
                <Icono className={`h-5 w-5 ${a.texto}`} />
                <p className="mt-3 font-display text-sm font-bold text-white">{b.titulo}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{b.texto}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          <p className="text-sm font-semibold leading-relaxed text-white">{INTRO.frase}</p>
        </div>

        {/* Cómo funciona */}
        <div className="mt-10">
          <p className={`etiqueta-seccion ${a.texto}`}>Cómo funciona</p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {PASOS.map((p) => (
              <div key={p.n} className="tarjeta">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-azul-300 to-azul-600 font-display text-sm font-bold text-white">
                  {p.n}
                </span>
                <h3 className="mt-3 font-display text-sm font-bold text-white">{p.titulo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>

        {/* El bloque SOLICITO CORRECCION */}
        <div className="mt-10">
          <p className={`etiqueta-seccion ${a.texto}`}>El bloque ## SOLICITO CORRECCION</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">
            Va después del encabezado de siempre. Seis renglones, en este orden:
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <tbody>
                {CAMPOS.map((c, i) => (
                  <tr
                    key={c.campo}
                    className={`border-white/5 ${i > 0 ? 'border-t' : ''} ${
                      i % 2 ? 'bg-white/[0.02]' : ''
                    }`}
                  >
                    <td className="w-[38%] px-4 py-3 align-top font-mono text-[12.5px] font-semibold text-azul-300 sm:w-[24%] sm:px-5">
                      {c.campo}
                    </td>
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-400 sm:px-5">
                      {c.texto}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cómo enviarlo */}
        <div className="mt-10">
          <p className={`etiqueta-seccion ${a.texto}`}>Cómo enviarlo</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">
            Para: <span className="font-mono text-slate-200">{site.buzon}</span>. El asunto
            empieza con <span className="font-mono text-slate-200">[REPORTE]</span>, lleva el
            nombre del reporte original y termina en{' '}
            <span className="font-mono text-slate-200">- correccion</span>.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-5">
            <BloqueCopiable
              color="azul"
              titulo="Asunto del correo"
              descripcion="Reemplace lo que va entre < >. El prefijo no se toca."
              texto={ASUNTO}
              alturaMaxima="max-h-24"
              etiquetaCopiar="Copiar asunto"
            />
            <BloqueCopiable
              color="azul"
              titulo="Cuerpo del correo — plantilla de Corrección"
              descripcion="Copie, llene y pegue en el correo. Reemplace lo que va entre < >."
              texto={PLANTILLA}
              alturaMaxima="max-h-[32rem]"
              etiquetaCopiar="Copiar plantilla"
            />
            <BotonCorreo sistema={CORREO} />
          </div>
        </div>

        {/* Ejemplo */}
        <div className="mt-10">
          <button
            type="button"
            onClick={() => setVerEjemplo((v) => !v)}
            aria-expanded={verEjemplo}
            className={`flex w-full items-center justify-between gap-4 rounded-2xl border ${a.bordeSuave} bg-white/[0.02] p-5 text-left transition hover:bg-white/[0.05]`}
          >
            <div className="flex items-start gap-3">
              <FileCode2 className={`mt-0.5 h-5 w-5 shrink-0 ${a.texto}`} />
              <div>
                <h3 className="font-display text-base font-bold text-white">
                  Ejemplo de corrección: {EJEMPLO.titulo}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{EJEMPLO.contexto}</p>
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
              <BloqueCopiable color="azul" titulo="Asunto" texto={EJEMPLO.asunto} alturaMaxima="max-h-24" />
              <BloqueCopiable
                color="azul"
                titulo="Cuerpo completo de la solicitud"
                descripcion="Con los datos identificables sustituidos por datos de demostración."
                texto={EJEMPLO.cuerpo}
                alturaMaxima="max-h-[34rem]"
              />
            </div>
          )}
        </div>

        {/* Importante */}
        <div className="mt-10 rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-300" />
            <h3 className="font-display text-sm font-bold text-white">Importante</h3>
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {IMPORTANTE.map((i) => (
              <li key={i.titulo} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300">
                <Bug className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <span>
                  <strong className="font-semibold text-white">{i.titulo}.</strong> {i.texto}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
