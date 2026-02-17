import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FounderSection({ whatsappUrl }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] backdrop-blur-xl p-6 sm:p-8 shadow-[0_22px_70px_rgba(0,0,0,0.32)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="mt-4 text-xl font-extrabold titulo uppercase">
                  Detrás de PC en Marcha hay una persona real
                </h3>

                <p className="mt-3 text-sm text-white/75 leading-relaxed">
                  La misión es que compres bien una sola vez: que la PC sea la
                  adecuada para tu uso y que entiendas qué estás pagando.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-white/80">
                    Acompañamiento
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-white/80">
                    Transparencia
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-white/80">
                    Soporte real
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-extrabold titulo uppercase">
                Te ayudamos a elegir bien y evitar gastar mal
              </h2>

              <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
                Si no entendés de componentes, es normal. Por eso el foco no es
                vender “partes”: es armar una solución completa, explicada y
                acompañada.
              </p>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Recomendación según tu uso real
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Explicación clara de cada decisión
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Armado y pruebas antes de entregar
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Soporte post-venta y garantía
                </li>
              </ul>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
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
                    Hablemos y lo definimos
                  </a>
                ) : null}

                <Link
                  to="/como-pedir"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-extrabold border border-white/15 bg-white/5 hover:bg-white/10 transition"
                >
                  Ver cómo pedir
                </Link>

                <Link
                  to="/garantia"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-extrabold border border-white/15 bg-white/5 hover:bg-white/10 transition"
                >
                  Ver garantía
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
