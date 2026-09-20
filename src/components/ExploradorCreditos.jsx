// src/components/ExploradorCreditos.jsx
import React, { useMemo, useState } from 'react';
import { Search, X, Coins, FileText, ArrowUpDown } from 'lucide-react';
import creditos from '../data/creditos.json';
import site from '../config/site';
import { acento } from '../lib/acentos';

const normalizar = (s) =>
  (s || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const miles = (n) => (typeof n === 'number' ? n.toLocaleString('es-MX') : '—');

export default function ExploradorCreditos({ sistemas, color = 'aqua' }) {
  const a = acento(color);
  const [busqueda, setBusqueda] = useState('');
  const [subFiltro, setSubFiltro] = useState('todos');
  const [orden, setOrden] = useState('nombre'); // nombre | creditos

  const base = useMemo(
    () => creditos.items.filter((r) => sistemas.includes(r.s)),
    [sistemas]
  );

  const resultados = useMemo(() => {
    const q = normalizar(busqueda.trim());
    let lista = base;

    if (subFiltro !== 'todos') lista = lista.filter((r) => r.s === subFiltro);

    if (q) {
      const palabras = q.split(/\s+/).filter(Boolean);
      lista = lista.filter((r) => {
        const n = normalizar(r.n);
        return palabras.every((p) => n.includes(p));
      });
    }

    const copia = [...lista];
    if (orden === 'creditos') {
      copia.sort((x, y) => y.k - x.k || x.n.localeCompare(y.n, 'es'));
    } else {
      copia.sort((x, y) => x.n.localeCompare(y.n, 'es'));
    }
    return copia;
  }, [base, busqueda, subFiltro, orden]);

  const hayVarios = sistemas.length > 1;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02]">
      {/* Encabezado y controles */}
      <div className="border-b border-white/10 p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h4 className="font-display text-base font-bold text-white">
            Reportes que puede solicitar
          </h4>
          <p className="text-xs text-slate-400">
            {base.length} reportes · catálogo al {site.creditosActualizados}
          </p>
        </div>
        <p className="mt-1.5 text-sm text-slate-400">
          Busque su reporte por nombre de archivo para saber cuántos créditos necesita
          adquirir antes de enviar la solicitud.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Ej: auxiliar, balanza, comisiones, excel…"
              aria-label="Buscar reporte por nombre"
              className={`w-full rounded-xl border border-white/15 bg-noche-900/80 py-2.5 pl-9 pr-9 text-sm text-white placeholder:text-slate-500 focus:border-white/30 focus:outline-none focus:ring-2 ${a.anillo}`}
            />
            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOrden(orden === 'nombre' ? 'creditos' : 'nombre')}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-white/15 px-3 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-white/30 hover:text-white"
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            {orden === 'nombre' ? 'Ordenar por créditos' : 'Ordenar por nombre'}
          </button>
        </div>

        {hayVarios && (
          <div className="mt-3 flex flex-wrap gap-2">
            {['todos', ...sistemas].map((s) => {
              const activo = subFiltro === s;
              const cuenta =
                s === 'todos' ? base.length : base.filter((r) => r.s === s).length;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubFiltro(s)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    activo
                      ? a.chip
                      : 'border-white/15 text-slate-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {s === 'todos' ? 'Todos' : s} ({cuenta})
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Resultados */}
      <div className="scroll-fino max-h-[30rem] overflow-auto">
        {resultados.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <FileText className="mx-auto h-8 w-8 text-slate-600" />
            <p className="mt-3 text-sm font-semibold text-white">
              Ningún reporte coincide con «{busqueda}»
            </p>
            <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-slate-400">
              El catálogo lista reportes ya instalados. Si el suyo es una personalización
              con nombre propio, búsquelo por una parte del nombre del archivo. Si aun así
              no aparece, escríbanos: puede ser un reporte nuevo, y esos se cotizan aparte.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 z-10 bg-noche-800/95 backdrop-blur">
              <tr className="text-[11px] uppercase tracking-wider text-slate-400">
                <th className="px-4 py-2.5 font-semibold sm:px-5">Archivo</th>
                <th className="hidden px-3 py-2.5 text-right font-semibold sm:table-cell">
                  Caracteres
                </th>
                {hayVarios && (
                  <th className="hidden px-3 py-2.5 font-semibold md:table-cell">
                    Sistema
                  </th>
                )}
                <th className="px-4 py-2.5 text-right font-semibold sm:px-5">Créditos</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((r, i) => (
                <tr
                  key={`${r.s}-${r.n}-${i}`}
                  className="border-t border-white/5 transition hover:bg-white/[0.04]"
                >
                  <td className="px-4 py-2.5 sm:px-5">
                    <span className="font-mono text-[12.5px] text-slate-200 [overflow-wrap:anywhere]">
                      {r.n}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-slate-500 sm:hidden">
                      {miles(r.c)} caracteres
                      {hayVarios ? ` · ${r.s}` : ''}
                    </span>
                  </td>
                  <td className="hidden px-3 py-2.5 text-right font-mono text-[12.5px] text-slate-400 sm:table-cell">
                    {miles(r.c)}
                  </td>
                  {hayVarios && (
                    <td className="hidden px-3 py-2.5 text-xs text-slate-400 md:table-cell">
                      {r.s}
                    </td>
                  )}
                  <td className="px-4 py-2.5 text-right sm:px-5">
                    <span
                      className={`inline-flex min-w-[2.25rem] items-center justify-center gap-1 rounded-lg border px-2 py-0.5 font-display text-sm font-bold ${a.chip}`}
                    >
                      {r.k}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-3 text-xs text-slate-400 sm:px-5">
        <span>
          Mostrando <strong className="text-slate-200">{resultados.length}</strong> de{' '}
          {base.length}
        </span>
        <span className="flex max-w-md items-start gap-1.5 leading-relaxed">
          <Coins className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${a.texto}`} />
          <span>
            Los créditos se calculan por el tamaño del reporte, no por lo que se le pida
            cambiar.
          </span>
        </span>
      </div>
    </div>
  );
}
