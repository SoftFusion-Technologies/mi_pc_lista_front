import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaWhatsapp,
  FaCheckCircle,
  FaLayerGroup,
  FaBolt,
  FaShieldAlt,
  FaCogs,
  FaCloudUploadAlt,
  FaHeadset,
  FaArrowRight,
  FaRegClock,
  FaChartLine,
  FaBriefcase,
  FaLaptopCode
} from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';

const cx = (...c) => c.filter(Boolean).join(' ');

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: d }
  })
};

function ImageTile({ src, alt, tag }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-black/10" />
            <div className="absolute -left-1/2 top-0 h-full w-1/2 animate-[ray_1.4s_ease-out_infinite] bg-[rgba(255,246,238,0.18)] blur-md skew-x-[-12deg]" />
          </motion.div>
        )}
      </AnimatePresence>

      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cx(
          'h-full w-full object-cover transition duration-500',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        draggable={false}
      />

      {tag ? (
        <div className="pointer-events-none absolute left-3 top-3">
          <div
            className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] border bg-black/30"
            style={{
              borderColor: 'rgba(222,174,97,0.22)',
              color: 'rgba(245,214,187,0.80)'
            }}
          >
            {tag}
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
    </div>
  );
}

export default function PcTrabajo() {
  const whatsappUrl = 'https://wa.me/5493517612425';

  // Pre vista: imágenes de “oficina / productividad / multitarea”
  const gallery = useMemo(
    () => [
      {
        src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=70',
        alt: 'Equipo de trabajo y productividad',
        tag: 'OFICINA'
      },
      {
        src: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=70',
        alt: 'Home office y videollamadas',
        tag: 'HOME OFFICE'
      },
      {
        src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=70',
        alt: 'Gestión y documentación',
        tag: 'GESTIÓN'
      },
      {
        src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=70',
        alt: 'Multitarea y productividad',
        tag: 'MULTITAREA'
      },
      {
        src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=70',
        alt: 'Trabajo con herramientas',
        tag: 'HERRAMIENTAS'
      },
      {
        src: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=70',
        alt: 'Setup profesional',
        tag: 'SETUP'
      },
      {
        src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=70',
        alt: 'Componentes y armado',
        tag: 'ARMADO'
      },
      {
        src: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1400&q=70',
        alt: 'PC EN MARCHA para usar',
        tag: 'LISTA'
      }
    ],
    []
  );

  const useCases = useMemo(
    () => [
      {
        icon: <FaBriefcase />,
        title: 'Oficina y gestión',
        desc: 'Excel/Sheets, sistemas, navegación y documentos sin fricción.'
      },
      {
        icon: <FaLayerGroup />,
        title: 'Multitarea real',
        desc: 'Muchas pestañas + apps abiertas a la vez, sin que “se muera”.'
      },
      {
        icon: <FaChartLine />,
        title: 'Productividad',
        desc: 'Fluidez para trabajar rápido: respuesta, arranque y carga.'
      },
      {
        icon: <FaLaptopCode />,
        title: 'Herramientas',
        desc: 'Apps de trabajo, CRM, ERP, suites y utilidades sin cuelgues.'
      }
    ],
    []
  );

  const tiers = useMemo(
    () => [
      {
        name: 'Trabajo Base',
        badge: 'EFICIENTE',
        items: [
          'Gestión diaria fluida (office, web, videollamadas)',
          'SSD + arranque rápido + configuración inicial',
          'Enfoque en estabilidad y respuesta'
        ]
      },
      {
        name: 'Trabajo Plus',
        badge: 'MULTITAREA',
        items: [
          'Muchos sistemas y apps abiertas a la vez',
          'Memoria optimizada para uso intensivo',
          'Mejor margen para 2 monitores y carga alta'
        ]
      },
      {
        name: 'Trabajo Max',
        badge: 'PRO',
        items: [
          'Uso exigente + tareas más pesadas ocasionales',
          'Pensada para upgrades y crecimiento',
          'Pruebas y checklist final antes de entrega'
        ]
      }
    ],
    []
  );

  return (
      <div className="bg-cyan-900 text-white">
          <ParticlesBackground></ParticlesBackground>
      {/* ===== Ambient background (más “work / productivity”) ===== */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-40 left-[10%] size-[46rem] rounded-full blur-3xl opacity-70"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, rgba(245,214,187,0.12), rgba(222,174,97,0.14) 40%, rgba(0,0,0,0) 74%)'
          }}
        />
        <div
          className="absolute -bottom-44 right-[6%] size-[52rem] rounded-full blur-3xl opacity-60"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.18), rgba(157,112,63,0.10) 42%, rgba(0,0,0,0) 76%)'
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.16]"
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
              'radial-gradient(72% 60% at 50% 34%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.58) 100%)'
          }}
        />
      </div>

      {/* ===== Hero ===== */}
      <section className="relative mx-auto max-w-6xl px-4 pt-10 pb-10 md:pt-14 md:pb-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
        >
          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex flex-col lg:flex-row lg:items-start gap-8">
              {/* Left */}
              <div className="min-w-0 flex-1">
                <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2">
                  <span className="font-bignoodle tracking-[0.22em] text-[11px] uppercase crema">
                    PC EN MARCHA · pc trabajo
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_12px_rgba(222,174,97,0.45)]" />
                  <span className="text-[12px] text-white/70">
                    Córdoba Capital
                  </span>
                </div>

                <h1 className="mt-5 leading-[1.06]">
                  <span className="titulo block text-3xl sm:text-4xl md:text-5xl">
                    PC Trabajo
                  </span>
                  <span className="titulo block mt-1 text-white/90 text-2xl sm:text-3xl md:text-4xl">
                    Multitarea, estabilidad y productividad sin interrupciones
                  </span>
                </h1>

                <p className="cuerpo mt-4 text-white/75 text-[15px] sm:text-base md:text-lg max-w-2xl">
                  Para oficina y home office: muchas pestañas, sistemas,
                  videollamadas y apps a la vez. Te la armamos pensando en
                  estabilidad, respuesta y margen para crecer.
                </p>

                {/* Use cases */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                  {useCases.map((it) => (
                    <div
                      key={it.title}
                      className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="h-10 w-10 rounded-2xl border bg-white/5 flex items-center justify-center"
                          style={{ borderColor: 'rgba(222,174,97,0.20)' }}
                        >
                          <span style={{ color: 'rgba(245,214,187,0.85)' }}>
                            {it.icon}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] sm:text-sm font-semibold text-white/85">
                            {it.title}
                          </div>
                          <div className="mt-1 text-[12px] sm:text-[13px] text-white/65 leading-relaxed">
                            {it.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Value bullets (no repite la página estudio) */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                  {[
                    {
                      icon: <FaBolt />,
                      title: 'Respuesta rápida',
                      desc: 'Arranque veloz y apertura ágil de apps.'
                    },
                    {
                      icon: <FaShieldAlt />,
                      title: 'Estabilidad diaria',
                      desc: 'Configuración y pruebas para evitar fallas.'
                    },
                    {
                      icon: <FaCogs />,
                      title: 'Setup listo',
                      desc: 'Instalación + drivers + ajustes iniciales.'
                    },
                    {
                      icon: <FaCloudUploadAlt />,
                      title: 'Migración opcional',
                      desc: 'Te ayudamos a pasar datos si hace falta.'
                    }
                  ].map((it) => (
                    <div
                      key={it.title}
                      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-4"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="h-10 w-10 rounded-2xl border bg-black/20 flex items-center justify-center"
                          style={{ borderColor: 'rgba(157,112,63,0.20)' }}
                        >
                          <span style={{ color: 'rgba(245,214,187,0.85)' }}>
                            {it.icon}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] sm:text-sm font-semibold text-white/85">
                            {it.title}
                          </div>
                          <div className="mt-1 text-[12px] sm:text-[13px] text-white/65 leading-relaxed">
                            {it.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex"
                  >
                    <button
                      className={cx(
                        'group relative inline-flex items-center justify-center gap-2',
                        'rounded-2xl px-6 py-3 text-sm md:text-base',
                        'text-[color:var(--pc-bg)] font-semibold',
                        'shadow-[0_18px_50px_rgba(0,0,0,0.45)]',
                        'ring-1 ring-[rgba(222,174,97,0.35)]',
                        'transition-transform duration-200 hover:-translate-y-[1px] active:translate-y-0'
                      )}
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(222,174,97,0.98), rgba(157,112,63,0.95))'
                      }}
                    >
                      <FaWhatsapp />
                      TE AYUDAMOS A ELEGIR BIEN
                      <FaArrowRight className="opacity-80" />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                      >
                        <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-[rgba(255,246,238,0.35)] opacity-0 blur-md skew-x-[-12deg] group-hover:opacity-60 animate-[ray_1.2s_ease-out_infinite]" />
                      </span>
                    </button>
                  </a>

                  <a href="#galeria" className="inline-flex">
                    <button className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm md:text-base font-semibold border border-white/10 bg-white/5 backdrop-blur-xl text-white/85 hover:bg-white/7 transition">
                      Ver ejemplos
                    </button>
                  </a>

                  <div className="flex items-center gap-2 text-[12px] text-white/55">
                    <FaRegClock />
                    Respuesta rápida por WhatsApp
                  </div>
                </div>
              </div>

              {/* Right: “Flow + assurance” */}
              <div className="w-full lg:w-[360px]">
                <div className="rounded-[24px] border border-white/10 bg-black/20 backdrop-blur-xl p-5">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                    lista para trabajar
                  </div>

                  <div className="mt-3 grid gap-2.5">
                    {[
                      'Definimos tu uso real (apps, pestañas, sistemas).',
                      'Propuesta de componentes con alternativas.',
                      'Armado prolijo + instalación + drivers.',
                      'Pruebas y checklist final antes de entregar.'
                    ].map((t) => (
                      <div key={t} className="flex items-start gap-2">
                        <FaCheckCircle
                          className="mt-[3px]"
                          style={{ color: 'rgba(222,174,97,0.75)' }}
                        />
                        <div className="text-[13px] text-white/75 leading-relaxed">
                          {t}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 h-px w-full bg-white/10" />

                  <div className="mt-4 text-[12px] text-white/60">
                    Pensada para multitarea y estabilidad diaria. Migración de
                    datos opcional.
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {[
                      { k: 'Multitarea', v: 'OK' },
                      { k: 'Estabilidad', v: 'OK' },
                      { k: 'Setup', v: 'Incluido' },
                      { k: 'Soporte', v: 'Post-entrega' }
                    ].map((it) => (
                      <div
                        key={it.k}
                        className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
                      >
                        <div className="text-[10px] uppercase tracking-[0.18em] text-white/50">
                          {it.k}
                        </div>
                        <div className="mt-1 text-[13px] font-semibold text-white/85">
                          <span
                            className="bg-clip-text text-transparent"
                            style={{
                              backgroundImage:
                                'linear-gradient(90deg, rgba(255,246,238,0.95), rgba(222,174,97,0.92), rgba(157,112,63,0.90))'
                            }}
                          >
                            {it.v}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                  <div className="flex items-start gap-3">
                    <div
                      className="h-10 w-10 rounded-2xl border bg-black/20 flex items-center justify-center"
                      style={{ borderColor: 'rgba(222,174,97,0.22)' }}
                    >
                      <FaHeadset style={{ color: 'rgba(245,214,187,0.85)' }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-white/85">
                        Sugerencia
                      </div>
                      <div className="mt-1 text-[12px] text-white/65 leading-relaxed">
                        Si usás 2 monitores o abrís muchos sistemas a la vez,
                        contanos: ajustamos la configuración para que no se
                        degrade con el tiempo.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Right */}
            </div>
          </div>

          <div
            aria-hidden
            className="h-px w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(222,174,97,0.35), transparent)'
            }}
          />
        </motion.div>
      </section>

      {/* ===== Gallery ===== */}
      <section id="galeria" className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          custom={0}
          className="flex items-end justify-between gap-4"
        >
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
              pre vista
            </div>
            <h2 className="titulo mt-2 text-2xl sm:text-3xl text-white/90">
              Ejemplos de setups para trabajo
            </h2>
            <p className="cuerpo mt-2 text-white/70 max-w-2xl">
              Imágenes de referencia para la página.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex"
          >
            <button className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold border border-white/10 bg-white/5 backdrop-blur-xl text-white/85 hover:bg-white/7 transition">
              <FaWhatsapp />
              Consultar
            </button>
          </a>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {gallery.map((g) => (
            <div key={g.src} className="min-h-[180px] sm:min-h-[200px]">
              <ImageTile src={g.src} alt={g.alt} tag={g.tag} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== Tiers ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          custom={0}
          className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                niveles sugeridos
              </div>
              <h3 className="titulo mt-2 text-2xl sm:text-3xl text-white/90">
                PC Trabajo en 3 niveles
              </h3>
              <p className="cuerpo mt-2 text-white/70 max-w-2xl">
                No listamos componentes fijos para no desactualizar. Te armamos
                la propuesta según stock, presupuesto y tu carga real de
                trabajo.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/10 bg-black/15 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[15px] font-semibold text-white/85">
                    {t.name}
                  </div>
                  <div
                    className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] border bg-black/20"
                    style={{
                      borderColor: 'rgba(222,174,97,0.22)',
                      color: 'rgba(245,214,187,0.75)'
                    }}
                  >
                    {t.badge}
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  {t.items.map((x) => (
                    <div key={x} className="flex items-start gap-2">
                      <FaCheckCircle
                        className="mt-[3px]"
                        style={{ color: 'rgba(222,174,97,0.70)' }}
                      />
                      <div className="text-[13px] text-white/70 leading-relaxed">
                        {x}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 h-px w-full bg-white/10" />

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full"
                >
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold border border-white/10 bg-white/5 backdrop-blur-xl text-white/85 hover:bg-white/7 transition">
                    Pedir propuesta
                    <FaArrowRight className="opacity-70" />
                  </button>
                </a>
              </div>
            ))}
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
