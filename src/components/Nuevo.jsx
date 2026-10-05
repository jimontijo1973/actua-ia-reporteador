// src/components/Nuevo.jsx
import React from 'react';
import { esNuevo } from '../config/site';

/** Etiqueta NUEVO: se apaga sola en site.nuevoHasta. */
export default function Nuevo({ className = '' }) {
  if (!esNuevo()) return null;
  return (
    <span
      className={`inline-flex items-center rounded-full bg-amber-400 px-1.5 py-0.5 font-display text-[10px] font-extrabold uppercase leading-none tracking-wider text-noche-900 ${className}`}
    >
      Nuevo
    </span>
  );
}
