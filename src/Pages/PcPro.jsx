import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaWhatsapp,
  FaCrosshairs,
  FaBolt,
  FaFireAlt,
  FaVideo,
  FaHeadset,
  FaKeyboard,
  FaTachometerAlt,
  FaArrowRight,
  FaCheckCircle,
  FaRegClock
} from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';

const cx = (...c) => c.filter(Boolean).join(' ');

const fade = {
  hidden: { opacity: 0 },
  show: (d = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay: d }
  })
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: d }
  })
};

function GlowImage({ src, alt, label }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 0.65 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-black/10" />
            <div className="absolute -left-1/2 top-0 h-full w-1/2 animate-[ray_1.35s_ease-out_infinite] bg-[rgba(255,246,238,0.16)] blur-md skew-x-[-14deg]" />
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

      {/* neon overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(60% 60% at 35% 25%, rgba(255,70,170,0.18), rgba(0,0,0,0) 62%), radial-gradient(55% 55% at 72% 70%, rgba(60,255,210,0.14), rgba(0,0,0,0) 62%)'
        }}
      />

      {label ? (
        <div className="pointer-events-none absolute left-4 top-4">
          <div className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] border border-white/10 bg-black/35 text-white/80">
            {label}
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
}

function StatPill({ k, v }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
      <div className="text-[10px] uppercase tracking-[0.22em] text-white/55">
        {k}
      </div>
      <div className="mt-1 text-[13px] font-semibold text-white/90">{v}</div>
    </div>
  );
}

export default function PcPro() {
  const whatsappUrl = 'https://wa.me/5493517612425';

  // Showcase (pre vista) - gamer / setup / rgb / rigs
  const showcase = useMemo(
    () => [
      {
        src: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1600&q=70',
        alt: 'Setup gamer con iluminación',
        label: 'SETUP'
      },
      {
        src: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1600&q=70',
        alt: 'PC gamer y periféricos',
        label: 'RIG'
      },
      {
        src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=70',
        alt: 'Iluminación RGB y escritorio',
        label: 'RGB'
      },
      {
        src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=70',
        alt: 'Gaming competitivo',
        label: 'FPS'
      },
      {
        src: 'https://images.unsplash.com/photo-1622893288761-823ba60f17b1?auto=format&fit=crop&w=1600&q=70',
        alt: 'Streaming / content',
        label: 'STREAM'
      },
      {
        src: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1600&q=70',
        alt: 'PC EN MARCHA para usar',
        label: 'LISTA'
      }
    ],
    []
  );

  const arenas = useMemo(
    () => [
      {
        icon: <FaCrosshairs />,
        title: 'Gaming competitivo',
        desc: 'FPS estables, baja latencia, respuesta instantánea.'
      },
      {
        icon: <FaVideo />,
        title: 'Streaming + grabación',
        desc: 'Jugar y transmitir sin que se caigan los frames.'
      },
      {
        icon: <FaFireAlt />,
        title: 'Edición / creación',
        desc: 'Más potencia para render, export y proyectos grandes.'
      },
      {
        icon: <FaTachometerAlt />,
        title: 'Performance real',
        desc: 'Ajuste fino para que rinda donde importa (no humo).'
      }
    ],
    []
  );

  const tiers = useMemo(
    () => [
      {
        name: 'Pro Entry',
        badge: '1080p / ALTO',
        bullets: [
          'Gaming fluido + multitarea',
          'Punto ideal “precio/rendimiento”',
          'Upgrade-friendly'
        ]
      },
      {
        name: 'Pro Core',
        badge: '1440p / ULTRA',
        bullets: [
          'Más margen para stream y creación',
          'Mayor estabilidad y frames',
          'Pensada para crecer'
        ]
      },
      {
        name: 'Pro Apex',
        badge: '4K / EXTREMO',
        bullets: [
          'Potencia para lo más exigente',
          'Componentes seleccionados por estabilidad',
          'Checklist y stress test final'
        ]
      }
    ],
    []
  );

  return (
    <div className="bg-gray-950 text-white">
      <ParticlesBackground> </ParticlesBackground>
      {/* ===== Gamer ambient background (neón controlado) ===== */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_22%,rgba(0,0,0,0)_35%,rgba(0,0,0,0.82)_100%)]" />

        <div
          className="absolute -top-56 left-[8%] size-[54rem] rounded-full blur-3xl opacity-70"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, rgba(255,70,170,0.22), rgba(0,0,0,0) 62%)'
          }}
        />
        <div
          className="absolute -bottom-56 right-[6%] size-[56rem] rounded-full blur-3xl opacity-65"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(60,255,210,0.18), rgba(0,0,0,0) 62%)'
          }}
        />

        {/* warm brand accent to keep identity */}
        <div
          className="absolute left-1/2 top-1/2 size-[64rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-50"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(222,174,97,0.14), rgba(157,112,63,0.08) 46%, rgba(0,0,0,0) 76%)'
          }}
        />

        {/* scanlines */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(255,255,255,0.10) 1px, transparent 1px, transparent 6px)'
          }}
        />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage:
              'radial-gradient(68% 56% at 50% 38%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'radial-gradient(68% 56% at 50% 38%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
          }}
        />
      </div>

      {/* ===== Hero: totally different layout ===== */}
      <section className="relative mx-auto max-w-6xl px-4 pt-10 pb-10 md:pt-14 md:pb-14">
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={0}
          className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_35px_120px_rgba(0,0,0,0.75)]"
        >
          {/* neon border glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,70,170,0.22), rgba(60,255,210,0.16), rgba(222,174,97,0.10))'
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[1px] rounded-[33px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.80))'
            }}
          />

          <div className="relative p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8">
              {/* Left content */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-4 py-2">
                    <span className="font-bignoodle tracking-[0.24em] text-[11px] uppercase text-white/85">
                      PC EN MARCHA · pc pro
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[rgba(255,70,170,0.85)] shadow-[0_0_16px_rgba(255,70,170,0.45)]" />
                    
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2">
                    <span className="text-[12px] text-white/60">
                      Córdoba Capital
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="text-[12px] text-white/60">
                      Armado a pedido
                    </span>
                  </div>
                </div>

                <motion.h1
                  variants={rise}
                  initial="hidden"
                  animate="show"
                  custom={0.08}
                  className="mt-6 leading-[1.02]"
                >
                  <span className="titulo block text-4xl sm:text-5xl md:text-6xl">
                    PC Pro Gamer
                  </span>
                  <span className="titulo block mt-2 text-2xl sm:text-3xl md:text-4xl text-white/90">
                    Frames estables, potencia real y estética premium
                  </span>
                </motion.h1>

                <motion.p
                  variants={rise}
                  initial="hidden"
                  animate="show"
                  custom={0.18}
                  className="cuerpo mt-4 text-white/70 text-[15px] sm:text-base md:text-lg max-w-xl"
                >
                  Para quienes juegan en serio: rendimiento consistente, ,
                  armado prolijo y ajustes finos. No vendemos humo: te
                  explicamos qué rinde y por qué.
                </motion.p>

                {/* “Arena” chips */}
                <motion.div
                  variants={rise}
                  initial="hidden"
                  animate="show"
                  custom={0.26}
                  className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl"
                >
                  {arenas.map((it) => (
                    <div
                      key={it.title}
                      className="rounded-2xl border border-white/10 bg-black/35 px-4 py-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                          <span className="text-white/85">{it.icon}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] sm:text-sm font-semibold text-white/85">
                            {it.title}
                          </div>
                          <div className="mt-1 text-[12px] sm:text-[13px] text-white/60 leading-relaxed">
                            {it.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* CTA row */}
                <motion.div
                  variants={rise}
                  initial="hidden"
                  animate="show"
                  custom={0.34}
                  className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center"
                >
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
                        'text-white shadow-[0_20px_60px_rgba(0,0,0,0.6)]',
                        'border border-white/10',
                        'transition-transform duration-200 hover:-translate-y-[1px] active:translate-y-0'
                      )}
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(255,70,170,0.92), rgba(60,255,210,0.76), rgba(222,174,97,0.70))'
                      }}
                    >
                      <FaWhatsapp />
                      Pedir presupuesto gamer
                      <FaArrowRight className="opacity-85" />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                      >
                        <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-[rgba(255,255,255,0.28)] opacity-0 blur-md skew-x-[-14deg] group-hover:opacity-60 animate-[ray_1.15s_ease-out_infinite]" />
                      </span>
                    </button>
                  </a>

                  <a href="#showcase" className="inline-flex">
                    <button className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm md:text-base font-semibold border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 transition">
                      Ver showcase
                    </button>
                  </a>

                  <div className="flex items-center gap-2 text-[12px] text-white/55">
                    <FaRegClock />
                    Respuesta rápida por WhatsApp
                  </div>
                </motion.div>
              </div>

              {/* Right: “Spec Console” + featured image */}
              <div className="min-w-0">
                <motion.div
                  variants={rise}
                  initial="hidden"
                  animate="show"
                  custom={0.14}
                  className="rounded-[28px] border border-white/10 bg-black/35 p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.24em] text-white/60">
                        pro
                      </div>
                      <div className="mt-2 text-[16px] font-semibold text-white/85">
                        Ajuste fino + control térmico
                      </div>
                      <div className="mt-1 text-[12px] text-white/60 leading-relaxed">
                        Pensada para sesiones largas sin caídas raras.
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[rgba(255,70,170,0.85)] shadow-[0_0_14px_rgba(255,70,170,0.45)]" />
                      <div className="h-2 w-2 rounded-full bg-[rgba(60,255,210,0.75)] shadow-[0_0_14px_rgba(60,255,210,0.35)]" />
                      <div className="h-2 w-2 rounded-full bg-[rgba(222,174,97,0.75)] shadow-[0_0_14px_rgba(222,174,97,0.30)]" />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <StatPill k="FPS" v="Estables" />
                    <StatPill k="Thermals" v="Cuidados" />
                    <StatPill k="Ruido" v="Controlado" />
                    <StatPill k="Cableado" v="Prolijo" />
                  </div>

                  <div className="mt-4 h-px w-full bg-white/10" />

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      {
                        icon: <FaKeyboard />,
                        t: 'Periféricos',
                        d: 'Te asesoramos según tu juego.'
                      },
                      {
                        icon: <FaHeadset />,
                        t: 'Audio',
                        d: 'Setup limpio para stream/discord.'
                      }
                    ].map((it) => (
                      <div
                        key={it.t}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-[2px] text-white/80">
                            {it.icon}
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

                  <div className="mt-4 text-[12px] text-white/55 leading-relaxed">
                    Te pasamos una propuesta clara: qué ganás en rendimiento y
                    qué conviene según tu monitor (1080p/1440p/4K).
                  </div>
                </motion.div>

                <motion.div
                  variants={rise}
                  initial="hidden"
                  animate="show"
                  custom={0.24}
                  className="mt-4"
                >
                  <GlowImage
                    src="https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1600&q=70"
                    alt="PC gamer"
                    label="FEATURED"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className="h-px w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,70,170,0.35), rgba(60,255,210,0.28), rgba(222,174,97,0.20), transparent)'
            }}
          />
        </motion.div>
      </section>

      {/* ===== Showcase gallery (different composition) ===== */}
      <section id="showcase" className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          custom={0}
          className="flex items-end justify-between gap-4"
        >
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-white/55">
              showcase
            </div>
            <h2 className="titulo mt-2 text-2xl sm:text-3xl text-white/90">
              Estética gamer, performance seria
            </h2>
            <p className="cuerpo mt-2 text-white/70 max-w-2xl">
              Pre vista para que la página ya tenga contenido. Después
              reemplazamos por fotos reales de tus builds.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex"
          >
            <button className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 transition">
              <FaWhatsapp />
              Consultar
            </button>
          </a>
        </motion.div>

        {/* different grid: “feature + strip” */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-3">
          <div className="min-h-[320px]">
            <GlowImage {...showcase[0]} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {showcase.slice(1, 5).map((x) => (
              <div key={x.src} className="min-h-[155px]">
                <GlowImage {...x} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {showcase.slice(5).map((x) => (
            <div key={x.src} className="min-h-[210px]">
              <GlowImage {...x} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== Tiers (gamer copy) ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          custom={0}
          className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/55">
                perfiles pro
              </div>
              <h3 className="titulo mt-2 text-2xl sm:text-3xl text-white/90">
                3 niveles Pro (según tu monitor y objetivos)
              </h3>
              <p className="cuerpo mt-2 text-white/70 max-w-2xl">
                No publicamos “listas fijas” para evitar desactualización.
                Definimos el build según stock, presupuesto y tu target
                (1080p/1440p/4K).
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {tiers.map((t, idx) => (
              <div
                key={t.name}
                className="relative rounded-3xl border border-white/10 bg-black/35 p-5 overflow-hidden"
              >
                {/* corner glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full blur-3xl opacity-55"
                  style={{
                    background:
                      idx === 0
                        ? 'radial-gradient(circle at 30% 30%, rgba(255,70,170,0.30), rgba(0,0,0,0) 60%)'
                        : idx === 1
                          ? 'radial-gradient(circle at 30% 30%, rgba(60,255,210,0.22), rgba(0,0,0,0) 60%)'
                          : 'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.22), rgba(0,0,0,0) 60%)'
                  }}
                />

                <div className="relative flex items-center justify-between gap-3">
                  <div className="text-[16px] font-semibold text-white/90">
                    {t.name}
                  </div>
                  <div className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] border border-white/10 bg-black/35 text-white/75">
                    {t.badge}
                  </div>
                </div>

                <div className="relative mt-4 grid gap-2">
                  {t.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-2">
                      <FaCheckCircle
                        className="mt-[3px]"
                        style={{ color: 'rgba(222,174,97,0.75)' }}
                      />
                      <div className="text-[13px] text-white/70 leading-relaxed">
                        {b}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative mt-5 h-px w-full bg-white/10" />

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="relative mt-4 inline-flex w-full"
                >
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 transition">
                    Pedir build {t.name}
                    <FaArrowRight className="opacity-70" />
                  </button>
                </a>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/30 p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-[12px] text-white/70">
                  Tip: decinos tu monitor y juegos principales (ej: 1080p 144Hz
                  / 1440p 165Hz) y priorizamos FPS + estabilidad.
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-white/60">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    1080p
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    1440p
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    4K
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    144Hz+
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Streaming
                  </span>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 transition">
                  <FaBolt />
                  Quiero un build Pro
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <style>{`
        @keyframes ray {
          0%   { transform: translateX(-40%) skewX(-14deg); opacity: 0; }
          15%  { opacity: .85; }
          100% { transform: translateX(40%)  skewX(-14deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
