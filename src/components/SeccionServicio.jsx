// src/components/SeccionServicio.jsx
// Árbol de decisión + selector [DIAGNOSTICO] | [REPORTE]. Contenido en data/diagnostico.js.
import React, { useMemo, useRef, useState } from 'react';
import {
  HelpCircle,
  Wrench,
  Bug,
  Zap,
  ArrowRight,
  CheckCircle2,
  Paperclip,
  Coins,
  FileCode2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Info,
} from 'lucide-react';
import BloqueCopiable from './BloqueCopiable';
import BotonCorreo from './BotonCorreo';
import ExploradorCreditos from './ExploradorCreditos';
import Nuevo from './Nuevo';
import { acento } from '../lib/acentos';
import site from '../config/site';
import sistemas from '../data/plantillas';
import {
  INTRO,
  FRASE_CLAVE,
  COMPARATIVO,
  FLUJO,
  TIPOS,
  NOTA_VERSION,
  ARBOL_REPORTE,
  EJEMPLO,
  COBRO,
  IMPORTANTE,
  MODO_REPORTE,
  FILTRO_CREDITOS_DIAGNOSTICO,
  plantillaDiagnostico,
  cuerpoCortoDiagnostico,
} from '../data/diagnostico';

const ICONO_TIPO = { 1: HelpCircle, 2: Wrench, 3: Bug };

export default function SeccionServicio() {
  const [modo, setModo] = useState('diagnostico'); // diagnostico | reporte
  const [tipo, setTipo] = useState(1);
  const [verEjemplo, setVerEjemplo] = useState(false);
  const panelRef = useRef(null);

  const enDiagnostico = modo === 'diagnostico';
  const tipoActual = TIPOS.find((x) => x.valor === tipo);
  const aD = acento('morado');
  const aR = acento('aqua');

  const irAlPanel = () =>
    requestAnimationFrame(() =>
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );

  const elegirTipo = (valor) => {
    setModo('diagnostico');
    setTipo(valor);
    irAlPanel();
  };
  const elegirReporte = () => {
    setModo('reporte');
    irAlPanel();
  };

  const asuntoDiag = `${site.prefijoDiagnostico} <resumen corto de lo que necesita>`;

  // Objeto con la misma forma que una sección de sistema, para reutilizar BotonCorreo.
  const correoDiag = useMemo(
    () => ({
      acento: 'morado',
      plantilla: plantillaDiagnostico(tipo),
      cuerpoCorto: cuerpoCortoDiagnostico(tipo),
      asuntoMailto: `${site.prefijoDiagnostico} `,
      textoAdjunto:
        tipo === 3
          ? 'Pegue encima la plantilla completa y adjunte su .rpt (obligatorio en el tipo 3)'
          : 'Pegue encima la plantilla completa y, si lo tiene, adjunte su .rpt',
    }),
    [tipo]
  );

  return (
    <section
      id="servicio"
      className="relative overflow-hidden border-t border-white/10 py-14 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 h-80 w-80 rounded-full bg-morado-500/15 blur-3xl"
      />

      <div className="contenedor relative">
        <div className="flex items-center gap-2">
          <p className="etiqueta-seccion text-morado-300">Elija su servicio</p>
          <Nuevo />
        </div>
        <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          ¿Sabe qué reporte necesita?
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-400">
          Elija la opción que describe su caso. Si ya sabe qué reporte se modifica y qué cambio
          quiere, vaya directo a <code className="font-mono text-slate-200">[REPORTE]</code>. Si
          no, empiece con un <code className="font-mono text-slate-200">[DIAGNOSTICO]</code>.
        </p>

        {/* ───────── Árbol de decisión */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button
            type="button"
            onClick={elegirReporte}
            aria-pressed={!enDiagnostico}
            className={`group rounded-2xl border p-5 text-left transition ${
              !enDiagnostico
                ? `${aR.borde} ${aR.fondo}`
                : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]'
            }`}
          >
            <span
              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${aR.borde} ${aR.fondo}`}
            >
              <Zap className={`h-4 w-4 ${aR.texto}`} />
            </span>
            <p className="mt-3 font-display text-sm font-bold text-white">
              {ARBOL_REPORTE.titulo}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{ARBOL_REPORTE.texto}</p>
            <p className={`mt-3 inline-flex items-center gap-1.5 text-xs font-bold ${aR.texto}`}>
              [REPORTE] <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </p>
          </button>

          {TIPOS.map((t) => {
            const Icono = ICONO_TIPO[t.valor];
            const activo = enDiagnostico && tipo === t.valor;
            return (
              <button
                key={t.valor}
                type="button"
                onClick={() => elegirTipo(t.valor)}
                aria-pressed={activo}
                className={`group rounded-2xl border p-5 text-left transition ${
                  activo
                    ? `${aD.borde} ${aD.fondo}`
                    : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]'
                }`}
              >
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${aD.borde} ${aD.fondo}`}
                >
                  <Icono className={`h-4 w-4 ${aD.texto}`} />
                </span>
                <p className="mt-3 font-display text-sm font-bold text-white">{t.arbol}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{t.arbolTexto}</p>
                <p
                  className={`mt-3 inline-flex items-center gap-1.5 text-xs font-bold ${aD.texto}`}
                >
                  [DIAGNOSTICO] · tipo {t.valor}{' '}
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </p>
              </button>
            );
          })}
        </div>

        {/* ───────── Selector */}
        <div
          ref={panelRef}
          role="tablist"
          aria-label="Servicio"
          className="mt-10 grid grid-cols-2 gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 sm:inline-grid sm:min-w-[26rem]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={enDiagnostico}
            onClick={() => setModo('diagnostico')}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-display text-sm font-bold transition ${
              enDiagnostico
                ? 'bg-morado-500 text-white shadow'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            [DIAGNOSTICO]
            <Nuevo />
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!enDiagnostico}
            onClick={() => setModo('reporte')}
            className={`inline-flex items-center justify-center rounded-xl px-4 py-3 font-display text-sm font-bold transition ${
              !enDiagnostico
                ? 'bg-aqua-500 text-noche-900 shadow'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            [REPORTE]
          </button>
        </div>

        {/* ───────── Modo [REPORTE] */}
        {!enDiagnostico && (
          <div role="tabpanel" className="mt-8 grid grid-cols-1 gap-5">
            <div className={`rounded-2xl border ${aR.bordeSuave} bg-white/[0.02] p-5 sm:p-6`}>
              <h3 className="font-display text-lg font-bold text-white">{MODO_REPORTE.titulo}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
                {MODO_REPORTE.texto}
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 md:grid-cols-2">
                {MODO_REPORTE.puntos.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${aR.texto}`} />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {sistemas.map((s) => {
                  const as = acento(s.acento);
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`inline-flex items-center justify-between gap-2 rounded-xl border ${as.borde} ${as.fondo} px-4 py-3 font-display text-sm font-bold ${as.texto} transition hover:brightness-125`}
                    >
                      {s.etiqueta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModo('diagnostico')}
              className={`flex items-start gap-3 rounded-2xl border ${aD.bordeSuave} ${aD.fondo} p-5 text-left transition hover:brightness-125`}
            >
              <HelpCircle className={`mt-0.5 h-5 w-5 shrink-0 ${aD.texto}`} />
              <span className="text-sm leading-relaxed text-slate-300">{MODO_REPORTE.pie}</span>
            </button>
          </div>
        )}

        {/* ───────── Modo [DIAGNOSTICO] */}
        {enDiagnostico && (
          <div role="tabpanel" className="mt-8 grid grid-cols-1 gap-8">
            {/* Qué es */}
            <div className={`rounded-2xl border ${aD.bordeSuave} bg-white/[0.02] p-5 sm:p-6`}>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-bold text-white">{INTRO.titulo}</h3>
                <Nuevo />
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">{INTRO.texto}</p>
              <p className="mt-2 text-sm text-slate-400">{INTRO.aplica}</p>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] p-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <p className="text-sm font-semibold leading-relaxed text-white">{FRASE_CLAVE}</p>
              </div>

              <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold">Etiqueta</th>
                      <th className="px-4 py-2.5 font-semibold">Para qué sirve</th>
                      <th className="hidden px-4 py-2.5 font-semibold sm:table-cell">
                        Qué recibe
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARATIVO.map((c) => (
                      <tr key={c.etiqueta} className="border-t border-white/5 align-top">
                        <td className="px-4 py-3 font-mono text-[12.5px] font-semibold text-white">
                          {c.etiqueta} {c.nuevo && <Nuevo className="ml-1 align-middle" />}
                        </td>
                        <td className="px-4 py-3 leading-relaxed text-slate-400">
                          {c.sirve}
                          <span className="mt-1 block text-xs text-slate-500 sm:hidden">
                            Recibe: {c.recibe}
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 leading-relaxed text-slate-400 sm:table-cell">
                          {c.recibe}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cómo funciona */}
            <div>
              <p className={`etiqueta-seccion ${aD.texto}`}>Cómo funciona</p>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                {FLUJO.map((p) => (
                  <div key={p.n} className="tarjeta">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-morado-400 to-azul-500 font-display text-sm font-bold text-white">
                      {p.n}
                    </span>
                    <h4 className="mt-3 font-display text-sm font-bold text-white">{p.titulo}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.texto}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tipo de solicitud */}
            <div>
              <p className={`etiqueta-seccion ${aD.texto}`}>Tipo de solicitud</p>
              <div
                role="tablist"
                aria-label="Tipo de solicitud"
                className="mt-4 grid grid-cols-1 gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 sm:grid-cols-3"
              >
                {TIPOS.map((t) => (
                  <button
                    key={t.valor}
                    type="button"
                    role="tab"
                    aria-selected={tipo === t.valor}
                    onClick={() => setTipo(t.valor)}
                    className={`rounded-xl px-4 py-3 text-left font-display text-sm font-bold transition ${
                      tipo === t.valor
                        ? `${aD.fondo} ${aD.texto} ring-1 ring-morado-500/40`
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="mr-2 font-mono text-xs opacity-70">Tipo {t.valor}</span>
                    {t.corto}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
                <div className="tarjeta lg:col-span-3">
                  <h4 className="font-display text-sm font-bold text-white">
                    Qué recibe — {tipoActual.recibeTitulo}
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {tipoActual.recibe.map((r) => (
                      <li key={r} className="flex items-start gap-3">
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${aD.texto}`} />
                        <span className="text-sm leading-relaxed text-slate-400">{r}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-500">
                    {NOTA_VERSION}
                  </p>
                </div>

                <div className="tarjeta lg:col-span-2">
                  <h4 className="font-display text-sm font-bold text-white">Cuándo usarlo</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {tipoActual.cuando}
                  </p>
                  <div className="mt-4 flex items-start gap-2.5 text-sm text-slate-400">
                    <Paperclip className={`mt-0.5 h-4 w-4 shrink-0 ${aD.texto}`} />
                    <span className="leading-relaxed">
                      <strong className="text-white">Adjunto {tipoActual.adjunto.toLowerCase()}.</strong>{' '}
                      El .rpt tal como está instalado, con las librerías que use (por ejemplo, las
                      de sus líneas <span className="font-mono text-slate-300">Incluye</span>).
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cómo enviarlo */}
            <div>
              <p className={`etiqueta-seccion ${aD.texto}`}>Cómo enviarlo</p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">
                Para: <span className="font-mono text-slate-200">{site.buzon}</span>. El asunto
                empieza con <span className="font-mono text-slate-200">[DIAGNOSTICO]</span> y un
                resumen corto de lo que necesita.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-5">
                <BloqueCopiable
                  color="morado"
                  titulo="Asunto del correo"
                  descripcion="Reemplace lo que va entre < >. El prefijo no se toca."
                  texto={asuntoDiag}
                  alturaMaxima="max-h-24"
                  etiquetaCopiar="Copiar asunto"
                />
                <BloqueCopiable
                  color="morado"
                  titulo={`Cuerpo del correo — plantilla para el tipo ${tipo}`}
                  descripcion="Copie, llene y pegue en el correo. Reemplace lo que va entre < >."
                  texto={correoDiag.plantilla}
                  alturaMaxima="max-h-[32rem]"
                  etiquetaCopiar="Copiar plantilla"
                />
                <BotonCorreo sistema={correoDiag} />
              </div>
            </div>

            {/* Ejemplo */}
            <div>
              <button
                type="button"
                onClick={() => setVerEjemplo((v) => !v)}
                aria-expanded={verEjemplo}
                className={`flex w-full items-center justify-between gap-4 rounded-2xl border ${aD.bordeSuave} bg-white/[0.02] p-5 text-left transition hover:bg-white/[0.05]`}
              >
                <div className="flex items-start gap-3">
                  <FileCode2 className={`mt-0.5 h-5 w-5 shrink-0 ${aD.texto}`} />
                  <div>
                    <h3 className="font-display text-base font-bold text-white">
                      Ejemplo: {EJEMPLO.titulo}
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
                  <BloqueCopiable
                    color="morado"
                    titulo="Asunto"
                    texto={EJEMPLO.asunto}
                    alturaMaxima="max-h-24"
                  />
                  <BloqueCopiable
                    color="morado"
                    titulo="Cuerpo completo de la solicitud"
                    descripcion="Con los datos identificables sustituidos por datos de demostración."
                    texto={EJEMPLO.cuerpo}
                    alturaMaxima="max-h-[34rem]"
                  />
                  <div className="tarjeta">
                    <h4 className="font-display text-sm font-bold text-white">
                      Qué recibiría en la respuesta (resumen)
                    </h4>
                    <ol className="mt-4 space-y-4">
                      {EJEMPLO.respuesta.map((r, i) => (
                        <li key={r.titulo} className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${aD.borde} font-mono text-[11px] ${aD.texto}`}
                          >
                            {i + 1}
                          </span>
                          <p className="text-sm leading-relaxed text-slate-400">
                            <strong className="font-semibold text-white">{r.titulo}.</strong>{' '}
                            {r.texto}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>

            {/* Cobro */}
            <div>
              <p className={`etiqueta-seccion ${aD.texto}`}>Cobro</p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold sm:px-5">Caso</th>
                      <th className="px-4 py-2.5 font-semibold sm:px-5">Créditos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COBRO.tabla.map((r) => (
                      <tr key={r.caso} className="border-t border-white/5 align-top">
                        <td className="w-[38%] px-4 py-3 font-semibold text-white sm:px-5">
                          {r.caso}
                        </td>
                        <td className="px-4 py-3 leading-relaxed text-slate-400 sm:px-5">
                          {r.creditos}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
                {COBRO.notas.map((n) => (
                  <li key={n} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <Coins className={`mt-0.5 h-4 w-4 shrink-0 ${aD.texto}`} />
                    <span className="leading-relaxed">{n}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <ExploradorCreditos
                  sistemas={FILTRO_CREDITOS_DIAGNOSTICO}
                  color="morado"
                  titulo={COBRO.catalogo.titulo}
                  descripcion={COBRO.catalogo.descripcion}
                  columna={COBRO.catalogo.columna}
                  nota={COBRO.catalogo.nota}
                />
              </div>
            </div>

            {/* Importante */}
            <div className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-300" />
                <h3 className="font-display text-sm font-bold text-white">Importante</h3>
              </div>
              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                {IMPORTANTE.map((i) => (
                  <li key={i.titulo} className="text-sm leading-relaxed text-slate-300">
                    <strong className="font-semibold text-white">{i.titulo}.</strong> {i.texto}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
