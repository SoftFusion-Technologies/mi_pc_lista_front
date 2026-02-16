import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FaWhatsapp,
  FaClipboardList,
  FaComments,
  FaTools,
  FaTruck,
  FaCheckCircle,
  FaShieldAlt,
  FaRegClock,
  FaArrowRight
} from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
const cx = (...c) => c.filter(Boolean).join(' ');

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: d }
  })
};

function StepCard({ n, icon, title, desc, note }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full blur-3xl opacity-55"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.22), rgba(0,0,0,0) 60%)'
        }}
      />
      <div className="relative flex items-start gap-4">
        <div
          className="h-12 w-12 rounded-2xl border bg-black/25 flex items-center justify-center shrink-0"
          style={{ borderColor: 'rgba(222,174,97,0.22)' }}
        >
          <span style={{ color: 'rgba(245,214,187,0.90)' }}>{icon}</span>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div
              className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] border bg-black/25"
              style={{
                borderColor: 'rgba(245,214,187,0.16)',
                color: 'rgba(245,214,187,0.78)'
              }}
            >
              Paso {n}
            </div>
            <div className="text-[14px] sm:text-[15px] font-semibold text-white/90">
              {title}
            </div>
          </div>

          <div className="mt-2 text-[13px] sm:text-[14px] text-white/70 leading-relaxed">
            {desc}
          </div>

          {note ? (
            <div className="mt-3 text-[12px] text-white/55 leading-relaxed">
              <span className="text-white/70 font-semibold">Tip:</span> {note}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MiniFaq({ q, a }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
      <div className="text-[13px] font-semibold text-white/90">{q}</div>
      <div className="mt-2 text-[12px] sm:text-[13px] text-white/65 leading-relaxed">
        {a}
      </div>
    </div>
  );
}

export default function ComoPedir() {
  const whatsappUrl = 'https://wa.me/5493517612425';

  const pasos = useMemo(
    () => [
      {
        n: 1,
        icon: <FaComments />,
        title: 'Nos contás qué necesitás',
        desc: 'Por WhatsApp nos decís para qué la usás (estudio, trabajo o gamer), si ya tenés PC y qué problema o objetivo tenés.',
        note: 'Si podés, mandá foto del equipo y una breve descripción (lenta, se apaga, hace ruido, no da imagen).'
      },
      {
        n: 2,
        icon: <FaClipboardList />,
        title: 'Te hacemos preguntas cortas y claras',
        desc: 'Te pedimos lo mínimo para entender el caso: qué pasa, cuándo empezó y qué querés lograr. Nada de vueltas.',
        note: 'Si es armado, también definimos presupuesto y monitor (1080p/1440p/4K) para elegir bien.'
      },
      {
        n: 3,
        icon: <FaTools />,
        title: 'Diagnóstico + propuesta',
        desc: 'Revisamos el equipo y te pasamos un diagnóstico entendible y una propuesta con opciones (si hay más de una).',
        note: 'Siempre priorizamos estabilidad y rendimiento real (no “cosas que suenan lindas”).'
      },
      {
        n: 4,
        icon: <FaCheckCircle />,
        title: 'Se hace el trabajo y te informamos',
        desc: 'Ejecutamos el servicio y te dejamos por escrito qué se hizo, por qué y qué mejora esperar.',
        note: 'Si aparece algo extra, se consulta antes. Transparencia total.'
      },
      {
        n: 5,
        icon: <FaTruck />,
        title: 'Entrega y soporte post-servicio',
        desc: 'Te entregamos la PC EN MARCHA, probada y con recomendaciones básicas para mantenerla bien.',
        note: 'Si necesitás seguimiento, coordinamos soporte y próximos pasos.'
      }
    ],
    []
  );

  return (
      <div className="bg-fondo text-white">
        <ParticlesBackground></ParticlesBackground>
      {/* Background suave (marca) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-44 left-[10%] size-[48rem] rounded-full blur-3xl opacity-65"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, rgba(245,214,187,0.12), rgba(222,174,97,0.14) 40%, rgba(0,0,0,0) 74%)'
          }}
        />
        <div
          className="absolute -bottom-52 right-[8%] size-[52rem] rounded-full blur-3xl opacity-55"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.16), rgba(157,112,63,0.10) 42%, rgba(0,0,0,0) 76%)'
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(245,214,187,.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,214,187,.10) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage:
              'radial-gradient(70% 56% at 50% 40%, rgba(0,0,0,1) 42%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'radial-gradient(70% 56% at 50% 40%, rgba(0,0,0,1) 42%, rgba(0,0,0,0) 100%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(72% 60% at 50% 34%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.60) 100%)'
          }}
        />
      </div>

      <section className="mx-auto max-w-6xl px-4 pt-10 pb-14 md:pt-14 md:pb-16">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_28px_90px_rgba(0,0,0,0.55)]"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2">
                <span className="font-bignoodle tracking-[0.22em] text-[11px] uppercase crema">
                  cómo pedir
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_12px_rgba(222,174,97,0.45)]" />
                <span className="text-[12px] text-white/70">
                  simple y transparente
                </span>
              </div>

              <h1 className="mt-5 leading-[1.05]">
                <span className="titulo block text-3xl sm:text-4xl md:text-5xl text-white/95">
                  TE AYUDAMOS A ELEGIR BIEN es fácil
                </span>
                <span className="titulo block mt-1 text-2xl sm:text-3xl md:text-4xl text-white/85">
                  5 pasos, sin confusión
                </span>
              </h1>

              <p className="cuerpo mt-4 text-white/70 text-[15px] sm:text-base md:text-lg max-w-2xl">
                Te guiamos de principio a fin. Te hacemos preguntas concretas,
                te damos un diagnóstico entendible y trabajamos con criterios
                claros: rendimiento, estabilidad y seguridad.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <button
                  className={cx(
                    'group relative inline-flex items-center justify-center gap-2',
                    'rounded-2xl px-6 py-3 text-sm md:text-base font-semibold',
                    'text-[color:var(--pc-bg)] shadow-[0_18px_50px_rgba(0,0,0,0.45)]',
                    'ring-1 ring-[rgba(222,174,97,0.35)]',
                    'transition-transform duration-200 hover:-translate-y-[1px] active:translate-y-0'
                  )}
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(222,174,97,0.98), rgba(157,112,63,0.95))'
                  }}
                >
                  <FaWhatsapp />
                  Hablar por WhatsApp
                  <FaArrowRight className="opacity-80" />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                  >
                    <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-[rgba(255,246,238,0.35)] opacity-0 blur-md skew-x-[-12deg] group-hover:opacity-60 animate-[ray_1.2s_ease-out_infinite]" />
                  </span>
                </button>
              </a>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="flex items-center gap-2 text-[12px] text-white/65">
                  <FaRegClock />
                  Respuesta rápida. Coordinamos por WhatsApp.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: <FaClipboardList />,
                t: 'Info mínima',
                d: 'Preguntas cortas para entender el caso.'
              },
              {
                icon: <FaShieldAlt />,
                t: 'Transparencia',
                d: 'Se consulta antes si aparece algo extra.'
              },
              {
                icon: <FaCheckCircle />,
                t: 'Entrega lista',
                d: 'Probada y con recomendaciones.'
              }
            ].map((it) => (
              <div
                key={it.t}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="h-10 w-10 rounded-2xl border bg-black/20 flex items-center justify-center"
                    style={{ borderColor: 'rgba(222,174,97,0.22)' }}
                  >
                    <span style={{ color: 'rgba(245,214,187,0.90)' }}>
                      {it.icon}
                    </span>
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-white/85">
                      {it.t}
                    </div>
                    <div className="mt-1 text-[12px] text-white/60 leading-relaxed">
                      {it.d}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            aria-hidden
            className="mt-7 h-px w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(222,174,97,0.35), transparent)'
            }}
          />
        </motion.div>

        {/* Steps */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-3">
          {pasos.map((p, i) => (
            <motion.div
              key={p.n}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              custom={0.06 * i}
            >
              <StepCard {...p} />
            </motion.div>
          ))}
        </div>

        {/* FAQ breve */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          custom={0}
          className="mt-10 rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                dudas frecuentes
              </div>
              <h2 className="titulo mt-2 text-2xl sm:text-3xl text-white/90">
                Lo esencial
              </h2>
              <p className="cuerpo mt-2 text-white/70 max-w-2xl">
                Si querés, te respondemos todo por WhatsApp. Acá van las
                preguntas más comunes.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex"
            >
              <button className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold border border-white/10 bg-black/20 text-white/85 hover:bg-white/7 transition">
                <FaWhatsapp />
                Consultar ahora
              </button>
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <MiniFaq
              q="¿Qué tengo que mandar para empezar?"
              a="Con 2–3 datos alcanza: para qué la usás, qué te pasa (si es reparación) y presupuesto aproximado (si es armado)."
            />
            <MiniFaq
              q="¿Me avisan antes de hacer algo extra?"
              a="Sí. Si aparece un cambio necesario, se consulta antes. La idea es cero sorpresas."
            />
            <MiniFaq
              q="¿Puedo pedir opciones?"
              a="Claro. Si hay alternativas, te mostramos el impacto real en rendimiento y costo para que elijas bien."
            />
          </div>
        </motion.div>
      </section>

      <style>{`
        @keyframes ray {
          0%   { transform: translateX(-40%) skewX(-12deg); opacity: 0; }
          15%  { opacity: .85; }
          100% { transform: translateX(40%)  skewX(-12deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
