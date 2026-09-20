// src/components/Preguntas.jsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import site from '../config/site';

const PREGUNTAS = [
  {
    q: '¿Qué es un crédito y cuántos necesito?',
    a: 'Cada reporte tiene asignado un número de créditos según su tamaño en caracteres: los más grandes cuestan más porque hay más código que leer, entender y volver a compilar. En el catálogo de cada sección busque su archivo y ahí aparece el número. No depende de qué tan complicado sea el cambio que pida, sino del reporte que se va a tocar.',
  },
  {
    q: '¿Pueden hacerme un reporte nuevo desde cero?',
    a: 'Por este canal no. El robot trabaja sobre un .RPT que usted ya tiene instalado: lo lee, aplica los cambios y lo devuelve compilado. Un reporte nuevo es un desarrollo y se cotiza aparte con su asesor.',
  },
  {
    q: '¿Por qué tengo que adjuntar mi archivo si ustedes ya tienen el del fabricante?',
    a: 'Porque el suyo casi nunca es el del fabricante. Un reporte instalado suele traer personalizaciones acumuladas —columnas agregadas, filtros, librerías propias— que no existen en ninguna base original. Si trabajáramos sobre la copia del fabricante le devolveríamos un archivo que le borra años de ajustes.',
  },
  {
    q: '¿Puedo pedir dos reportes en el mismo correo?',
    a: 'No. Un reporte por correo. Si el cambio toca una librería, esa sí se adjunta en el mismo mensaje, porque forma parte del mismo trabajo.',
  },
  {
    q: '¿Qué pasa si no escribo la sección de VALIDACION?',
    a: 'La solicitud se procesa igual, pero usted se queda sin forma de comprobar la entrega más que abriéndola y revisándola a mano. La validación es lo que convierte "quedó bien" en un número que cualquiera verifica: cuántos renglones deben salir, qué debe dar un cálculo, qué no debe haber cambiado. En Contabilidad es prácticamente obligatoria: si un parámetro cambia la consulta, esa rama del código sólo se ejerce al correrla.',
  },
  {
    q: '¿Por qué el asunto tiene que empezar con [REPORTE]?',
    a: 'Porque la corrida filtra el buzón por ese prefijo. Un correo sin él simplemente no se recoge, y nadie se entera de que usted escribió.',
  },
  {
    q: 'Le di al botón y no se abrió mi correo. ¿Qué hago?',
    a: `El botón usa el cliente de correo predeterminado del equipo. Si no hay uno configurado —común cuando se usa sólo Gmail o Outlook en el navegador— no pasa nada al pulsarlo. Copie la plantilla con el otro botón, abra su correo como siempre y escriba a ${site.buzon}.`,
  },
  {
    q: '¿En cuánto tiempo recibo el reporte?',
    a: 'Depende de la carga y del tamaño del reporte. Le responde al correo que puso en "Responder a", con el archivo y un acuse de la validación que pidió. Si algo de la solicitud quedó ambiguo, le escribimos antes de compilar en lugar de adivinar.',
  },
];

export default function Preguntas() {
  const [abierta, setAbierta] = useState(null);

  return (
    <section id="preguntas" className="border-t border-white/10 py-14 sm:py-20">
      <div className="contenedor">
        <p className="etiqueta-seccion text-aqua-400">Preguntas</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Lo que más nos preguntan
        </h2>

        <div className="mt-8 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
          {PREGUNTAS.map((p, i) => {
            const activa = abierta === i;
            return (
              <div key={p.q} className={activa ? 'bg-white/[0.03]' : ''}>
                <button
                  type="button"
                  onClick={() => setAbierta(activa ? null : i)}
                  aria-expanded={activa}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/[0.03]"
                >
                  <span className="font-display text-sm font-bold text-white">{p.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                      activa ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activa && (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">{p.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
