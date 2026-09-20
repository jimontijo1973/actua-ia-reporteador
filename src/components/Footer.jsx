// src/components/Footer.jsx
import React from 'react';
import { Mail, Phone, MessageCircle, Clock, MapPin } from 'lucide-react';
import { Glifo } from './Marca';
import site from '../config/site';

export default function Footer() {
  const año = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-noche-900">
      <div className="contenedor py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Glifo className="h-9 w-9" />
              <div className="leading-tight">
                <p className="font-display text-lg font-extrabold text-white">
                  {site.nombre}
                </p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                  {site.subtitulo}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {site.distintivo}. Desarrollo, personalización y soporte de reportes sobre las
              bases de CONTPAQi®.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-white">Solicitudes</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.buzon}`}
                  className="inline-flex items-start gap-2 text-aqua-300 transition hover:text-aqua-400"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="[overflow-wrap:anywhere]">{site.buzon}</span>
                </a>
                <p className="mt-1 pl-6 text-xs text-slate-500">
                  Asunto con <code className="font-mono">[REPORTE]</code> y el .RPT adjunto
                </p>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                {site.contacto.horario}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-white">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <span>
                  <a
                    href={`tel:+52${site.contacto.telefono.replace(/\s/g, '')}`}
                    className="transition hover:text-white"
                  >
                    {site.contacto.telefono}
                  </a>{' '}
                  ·{' '}
                  <a
                    href={`tel:+52${site.contacto.telefonoAlterno.replace(/\s/g, '')}`}
                    className="transition hover:text-white"
                  >
                    {site.contacto.telefonoAlterno}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <span>
                  <a
                    href={`https://wa.me/${site.contacto.whatsappSoporte}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-white"
                  >
                    WhatsApp Soporte
                  </a>{' '}
                  ·{' '}
                  <a
                    href={`https://wa.me/${site.contacto.whatsappVentas}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-white"
                  >
                    Ventas
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <span className="leading-relaxed">{site.contacto.domicilio}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {año} {site.razonSocial}
          </p>
          <p>
            CONTPAQi® es una marca registrada de Computación en Acción, S.A. de C.V.
            Catálogo de créditos actualizado al {site.creditosActualizados}.
          </p>
        </div>
      </div>
    </footer>
  );
}
