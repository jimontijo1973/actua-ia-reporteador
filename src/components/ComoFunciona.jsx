// src/components/ComoFunciona.jsx
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PASOS, REGLAS_COMUNES, CAMPOS_ENCABEZADO } from '../data/plantillas';

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="relative overflow-hidden border-t border-white/10 py-14 sm:py-20">
      <div className="contenedor">
        <p className="etiqueta-seccion text-aqua-400">Cómo funciona</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Cuatro pasos, un solo correo
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((p) => (
            <div key={p.n} className="tarjeta">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-aqua-500 to-azul-500 font-display text-sm font-bold text-noche-900">
                {p.n}
              </span>
              <h3 className="mt-3 font-display text-sm font-bold text-white">{p.titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.texto}</p>
            </div>
          ))}
        </div>

        {/* Reglas del correo */}
        <div className="mt-14">
          <p className="etiqueta-seccion text-azul-300">Reglas del correo</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Seis cosas que hacen que la solicitud no se rebote
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {REGLAS_COMUNES.map((r) => (
              <div key={r.titulo} className="tarjeta">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" />
                  <div>
                    <h3 className="font-display text-sm font-bold text-white">{r.titulo}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{r.texto}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Los nueve campos */}
        <div className="mt-14">
          <p className="etiqueta-seccion text-morado-300">El encabezado</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Los nueve campos van siempre los nueve
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">
            En ese orden, uno por renglón. Si alguno no aplica se escribe{' '}
            <span className="font-mono text-slate-300">ninguna</span> o{' '}
            <span className="font-mono text-slate-300">no aplica</span>, nunca se omite el
            renglón.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <tbody>
                {CAMPOS_ENCABEZADO.map((c, i) => (
                  <tr
                    key={c.campo}
                    className={`border-white/5 ${i > 0 ? 'border-t' : ''} ${
                      i % 2 ? 'bg-white/[0.02]' : ''
                    }`}
                  >
                    <td className="w-[38%] px-4 py-3 align-top font-mono text-[12.5px] font-semibold text-morado-300 sm:w-[24%] sm:px-5">
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
      </div>
    </section>
  );
}
