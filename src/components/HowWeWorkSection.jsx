import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Te escuchamos',
    desc: 'Uso real (estudio, trabajo, diseño), presupuesto y prioridades.'
  },
  {
    title: 'Te proponemos opciones',
    desc: '2 alternativas claras: eficiente vs. ideal, con explicación.'
  },
  {
    title: 'Armado + pruebas',
    desc: 'Compatibilidad, estabilidad, temperaturas y rendimiento esperado.'
  },
  {
    title: 'Entrega + soporte',
    desc: 'Te acompañamos después: dudas, recomendaciones y seguimiento.'
  }
];

export default function HowWeWorkSection({ whatsappUrl }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold titulo uppercase">
              Cómo trabajamos
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-2xl">
              La idea es simple: que elijas bien, sin gastar mal y sin dudas.
            </p>
          </div>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-extrabold border border-white/15 bg-white/5 hover:bg-white/10 transition"
            >
              Quiero asesoramiento
            </a>
          ) : null}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  className="
                  group relative overflow-hidden rounded-2xl
                  px-4 py-2.5
                  font-extrabold text-[12px] tracking-[0.14em] uppercase
                  text-[color:var(--pc-bg)]
                  bg-gradient-to-r from-[color:var(--pc-oro)] to-[color:var(--pc-oro-oscuro)]
                  shadow-[0_16px_40px_rgba(0,0,0,0.35)]
                  hover:brightness-110 hover:-translate-y-[1px] active:translate-y-0 transition
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pc-oro)]/55
                "
                >
                  {idx + 1}
                </span>
                <h3 className="text-base font-extrabold">{s.title}</h3>
              </div>

              <p className="mt-3 text-sm text-white/75 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
