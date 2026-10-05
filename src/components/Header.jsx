// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import Marca from './Marca';
import Nuevo from './Nuevo';
import site from '../config/site';
import sistemas from '../data/plantillas';

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const alScroll = () => setScrolled(window.scrollY > 12);
    alScroll();
    window.addEventListener('scroll', alScroll, { passive: true });
    return () => window.removeEventListener('scroll', alScroll);
  }, []);

  const enlaces = [
    { href: '#como-funciona', texto: 'Cómo funciona' },
    { href: '#servicio', texto: 'Diagnóstico', nuevo: true },
    ...sistemas.map((s) => ({ href: `#${s.id}`, texto: s.etiqueta })),
    { href: '#preguntas', texto: 'Preguntas' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? 'border-white/10 bg-noche-900/90 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="contenedor flex h-16 items-center justify-between gap-4">
        <Marca />

        <nav className="hidden items-center gap-1 xl:flex">
          {enlaces.map((e) => (
            <a
              key={e.href}
              href={e.href}
              className="whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium text-slate-300 transition hover:bg-white/5 hover:text-white xl:px-3 xl:text-sm"
            >
              {e.texto}
              {e.nuevo && <Nuevo className="ml-1.5" />}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={abierto}
          className="rounded-lg border border-white/15 p-2 text-slate-300 transition hover:text-white xl:hidden"
        >
          {abierto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {abierto && (
        <div className="border-t border-white/10 bg-noche-900/95 backdrop-blur-md xl:hidden">
          <nav className="contenedor grid grid-cols-1 gap-1 py-3">
            {enlaces.map((e) => (
              <a
                key={e.href}
                href={e.href}
                onClick={() => setAbierto(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {e.texto}
                {e.nuevo && <Nuevo className="ml-2" />}
              </a>
            ))}
            <a
              href={`mailto:${site.buzon}`}
              className="mt-1 inline-flex items-center gap-2 rounded-xl border border-aqua-500/40 bg-aqua-500/10 px-3 py-2.5 text-sm font-semibold text-aqua-300"
            >
              <Mail className="h-4 w-4" />
              <span className="[overflow-wrap:anywhere]">{site.buzon}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
