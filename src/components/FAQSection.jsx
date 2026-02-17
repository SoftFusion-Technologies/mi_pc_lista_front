import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection({ whatsappUrl }) {
  const items = useMemo(
    () => [
      {
        q: 'No entiendo de componentes, ¿me van a guiar?',
        a: 'Sí. Te hacemos preguntas simples sobre tu uso real y te explicamos en claro por qué conviene cada opción.'
      },
      {
        q: '¿Cómo sé que no estoy gastando de más?',
        a: 'Te proponemos alternativas y justificamos cada decisión. El objetivo es que inviertas donde realmente impacta tu rendimiento.'
      },
      {
        q: '¿La PC se entrega lista para usar?',
        a: 'La idea es entregarla armada, probada y con lo necesario para que arranques sin renegar.'
      },
      {
        q: '¿Qué pasa si tengo un problema después?',
        a: 'Tenés soporte post-venta para dudas y seguimiento. Si surge algo, lo resolvemos con prioridad.'
      },
      {
        q: '¿Cómo funciona la garantía?',
        a: 'Depende del componente, pero la gestión es acompañada. Lo importante: no te quedás solo con el problema.'
      }
    ],
    []
  );

  const [open, setOpen] = useState(0);

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Preguntas frecuentes
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-2xl">
              Respondemos lo que normalmente frena una compra: dudas, miedo a
              equivocarse y soporte.
            </p>
          </div>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-extrabold bg-white text-[var(--pc-bg)] hover:opacity-95 transition"
            >
              Hacer una consulta
            </a>
          ) : null}
        </div>

        <div className="mt-8 space-y-3">
          {items.map((it, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={it.q}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                >
                  <span className="text-sm sm:text-base font-extrabold">
                    {it.q}
                  </span>
                  <span className="text-white/70 text-lg font-black">
                    {isOpen ? '–' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 text-sm text-white/75 leading-relaxed">
                        {it.a}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
