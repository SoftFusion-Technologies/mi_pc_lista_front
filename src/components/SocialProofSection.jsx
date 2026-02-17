import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Cliente',
    title: 'PC para trabajo/estudio',
    text: 'Me explicaron todo y la PC quedó justo para lo que necesitaba. Cero dudas.'
  },
  {
    name: 'Cliente',
    title: 'Actualización de equipo',
    text: 'Me recomendaron dónde valía la pena gastar y dónde no. Muy claro.'
  },
  {
    name: 'Cliente',
    title: 'Primera PC a medida',
    text: 'La entregaron lista, probada y con soporte. Me dio mucha tranquilidad.'
  }
];

export default function SocialProofSection() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold titulo uppercase">
            Lo que más valoran los clientes
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/70 max-w-2xl">
            Confianza, claridad y acompañamiento. No presión.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <motion.article
              key={`${t.name}-${idx}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
            >
              <p className="text-sm text-white/80 leading-relaxed">
                “{t.text}”
              </p>

              <div className="mt-5">
                <div className="text-sm font-extrabold">{t.name}</div>
                <div className="text-xs text-white/60">{t.title}</div>
              </div>

              <p className="mt-4 text-xs text-white/45">
                Reemplazá estos textos por testimonios reales (nombre + para qué
                la usa) y si podés agregá foto del build entregado.
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
