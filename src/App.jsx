// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ComoFunciona from './components/ComoFunciona';
import SeccionSistema from './components/SeccionSistema';
import Preguntas from './components/Preguntas';
import Footer from './components/Footer';
import sistemas from './data/plantillas';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <ComoFunciona />

        <div id="sistemas">
          {sistemas.map((s, i) => (
            <SeccionSistema key={s.id} sistema={s} indice={i + 1} />
          ))}
        </div>

        <Preguntas />
      </main>
      <Footer />
    </div>
  );
}
