// src/components/Marca.jsx
import React from 'react';
import site from '../config/site';

export function Glifo({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="acyaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00B2A9" />
          <stop offset="55%" stopColor="#005EB8" />
          <stop offset="100%" stopColor="#753BBD" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#acyaGrad)" />
      <rect x="2" y="2" width="44" height="44" rx="13" fill="#04121f" fillOpacity="0.14" />
      {/* Carita del robot */}
      <rect
        x="12"
        y="15"
        width="24"
        height="19"
        rx="6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
      />
      <circle cx="19.5" cy="24" r="2.4" fill="#ffffff" />
      <circle cx="28.5" cy="24" r="2.4" fill="#ffffff" />
      <path
        d="M24 15V9.5"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="8" r="2.3" fill="#ffffff" />
      <path
        d="M20 29.5h8"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

export default function Marca({ compacto = false }) {
  return (
    <a href="#inicio" className="flex items-center gap-3 group">
      <Glifo className="h-9 w-9 shrink-0 transition-transform group-hover:scale-105" />
      <span className="leading-tight">
        <span className="block font-display text-lg font-extrabold tracking-tight text-white">
          {site.nombre}
        </span>
        {!compacto && (
          <span className="hidden whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400 sm:block">
            {site.subtitulo}
          </span>
        )}
      </span>
    </a>
  );
}
