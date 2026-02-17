import React from 'react';
import { motion } from 'framer-motion';

const items = [
  {
    title: 'Asesoramiento claro',
    desc: 'Te explicamos en simple qué conviene y por qué.'
  },
  {
    title: 'PC lista para usar',
    desc: 'Armado prolijo, pruebas y optimización básica.'
  },
  {
    title: 'Transparencia total',
    desc: 'Sabés qué estás pagando y qué rendimiento esperar.'
  },
  {
    title: 'Soporte post-venta',
    desc: 'Acompañamiento real después de la entrega.'
  }
];

export default function TrustBar({ whatsappUrl }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, idx) => (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-[0_18px_55px_rgba(0,0,0,0.25)]"
            >
              <h3 className="text-sm font-extrabold tracking-wide">
                {it.title}
              </h3>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">
                {it.desc}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-sm text-white/70">
            No comprás partes: te llevás una solución armada para tu uso real.
          </p>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
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
              Asesorarme por WhatsApp
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
