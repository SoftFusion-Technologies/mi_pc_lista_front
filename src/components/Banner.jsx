import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const cx = (...c) => c.filter(Boolean).join(' ');

const enter = {
  hidden: { opacity: 0, y: 18 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: d }
  })
};

const floaty = {
  initial: { y: 0 },
  animate: {
    y: [0, -6, 0],
    transition: { duration: 4.6, repeat: Infinity, ease: 'easeInOut' }
  }
};

const Banner = ({
  id = 'banner',
  anchorServicios = '#perfiles',
  anchorContacto = '#contacto',
  whatsappUrl = ''
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  // Rotador: proceso de compra/armado (sin repetir el Hero)
  // Benjamin Orellana - 2026-02-02 - Copy más corto y orientado a conversión: perfil -> propuesta -> compra en locales confiables -> armado -> entrega.
  const taglines = useMemo(
    () => [
      'Elegí tu perfil y contanos el presupuesto.',
      'Te enviamos la propuesta con alternativas.',
      'Componentes en negocios confiables, a tu nombre.',
      'Armado prolijo + instalación: lista para usar.',
      'Checklist y pruebas antes de entregar.'
    ],
    []
  );

  const [idx, setIdx] = useState(0);

  // Benjamin Orellana - 2026-02-02 - Optimiza el rotador: se activa solo cuando el banner entra en vista (misma UX, menos trabajo fuera de pantalla).
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % taglines.length);
    }, 3800);
    return () => clearInterval(t);
  }, [inView, taglines.length]);

  // Cards: 3 perfiles + “incluye” (evita repetir “Córdoba Capital” dentro del bloque)
  // Benjamin Orellana - 2026-02-02 - Ajuste de descripciones: menos técnico, más “para qué te sirve” + claridad de compra a pedido.
  const features = useMemo(
    () => [
      {
        title: 'PC Estudio',
        desc: 'Ideal para clases, tareas y videollamadas. Rápida y simple para el día a día.',
        tag: 'ESTUDIO'
      },
      {
        title: 'PC Trabajo',
        desc: 'Multitarea sin fricción: herramientas, muchas pestañas y productividad real.',
        tag: 'TRABAJO'
      },
      {
        title: 'PC Pro',
        desc: 'Para exigencia: edición, diseño y proyectos pesados con rendimiento consistente.',
        tag: 'PRO'
      },
      {
        title: 'A pedido y con compra segura',
        desc: 'Te pasamos opciones y se compra en locales confiables según tu necesidad y presupuesto.',
        tag: 'OK'
      }
    ],
    []
  );

  // SVG pattern (tech warm)
  const circuitPattern = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(222,174,97,0.20)"/>
          <stop offset="1" stop-color="rgba(157,112,63,0.12)"/>
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#g)" stroke-width="1.5" opacity="0.95">
        <path d="M18 54h78v42h60V72h66" />
        <path d="M18 186h96v-42h42v66h66" />
        <path d="M54 18v78h42v60h-24v66" />
        <path d="M198 18v96h-42v42h66" />
        <circle cx="96" cy="96" r="4.2" fill="rgba(222,174,97,0.32)" stroke="rgba(222,174,97,0.16)"/>
        <circle cx="156" cy="96" r="4.2" fill="rgba(157,112,63,0.28)" stroke="rgba(157,112,63,0.14)"/>
        <circle cx="120" cy="144" r="4.2" fill="rgba(245,214,187,0.22)" stroke="rgba(245,214,187,0.12)"/>
        <circle cx="198" cy="162" r="4.2" fill="rgba(222,174,97,0.22)" stroke="rgba(222,174,97,0.12)"/>
      </g>
    </svg>
  `);

  const marqueeItems = useMemo(
    () => [
      'PC Estudio',
      'PC Trabajo',
      'PC Pro',
      'Armado a pedido',
      'Opciones claras',
      'Compra segura',
      'Instalación',
      'Drivers',
      'Configuración inicial',
      'Migración de datos',
      'Pruebas de estabilidad',
      'Checklist final',
      'Garantía y soporte'
    ],
    []
  );

  return (
    <section
      id={id}
      ref={ref}
      className={cx(
        'relative isolate overflow-hidden',
        'bg-[color:var(--pc-bg)] text-[color:var(--pc-marfil)]'
      )}
    >
      {/* ===== Background system ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* pattern */}
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,${circuitPattern}")`,
            backgroundSize: '260px 260px',
            backgroundRepeat: 'repeat',
            transform: 'rotate(6deg) scale(1.04)',
            maskImage:
              'radial-gradient(70% 60% at 50% 42%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'radial-gradient(70% 60% at 50% 42%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)'
          }}
        />

        {/* aurora blobs */}
        <div
          className="absolute -top-36 -left-36 size-[44rem] rounded-full blur-3xl opacity-70"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.22), rgba(157,112,63,0.10) 42%, rgba(0,0,0,0) 74%)'
          }}
        />
        <div
          className="absolute -bottom-44 -right-36 size-[48rem] rounded-full blur-3xl opacity-65"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(245,214,187,0.12), rgba(222,174,97,0.12) 45%, rgba(0,0,0,0) 76%)'
          }}
        />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(245,214,187,.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,214,187,.10) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(70% 56% at 50% 42%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'radial-gradient(70% 56% at 50% 42%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)'
          }}
        />

        {/* vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 60% at 50% 35%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.45) 100%)'
          }}
        />
      </div>

      {/* ===== Content ===== */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
          {/* Left */}
          <motion.div
            variants={enter}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            custom={0}
            className="text-left"
          >
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              <span className="font-bignoodle tracking-[0.22em] text-[11px] uppercase crema">
                PC EN MARCHA · pc armada a pedido
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_12px_rgba(222,174,97,0.45)]" />
              <span className="text-[12px] text-white/70">
                Estudio · Trabajo · Pro
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="text-[12px] text-white/60">Córdoba Capital</span>
            </div>

            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl leading-[1.06]">
              <span className="titulo block">PC nueva, sin dudas.</span>
              <span className="titulo block mt-1">
                Elegís el perfil y te la entregamos lista.
              </span>

              <span className="cuerpo block mt-3 text-white/80 text-[15px] sm:text-base md:text-lg max-w-xl">
                Te pasamos una propuesta rápida por WhatsApp con opciones
                claras. Si hay que comprar partes, se hace en negocios
                confiables según tu presupuesto.
              </span>
            </h2>

            {/* Rotating tagline */}
            <div className="mt-6 max-w-xl">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-4">
                {/* scanline */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    maskImage:
                      'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 60%)',
                    WebkitMaskImage:
                      'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 60%)'
                  }}
                >
                  <div className="absolute -top-12 left-0 h-24 w-full animate-[scan_2.8s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(222,174,97,0.18),transparent)]" />
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="mt-0.5 h-10 w-10 rounded-2xl border bg-black/20 flex items-center justify-center"
                    style={{ borderColor: 'rgba(222,174,97,0.26)' }}
                  >
                    <span className="h-2 w-2 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_12px_rgba(222,174,97,0.50)]" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                      cómo es el proceso
                    </div>

                    <div className="mt-2 text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                        >
                          <span
                            className="bg-clip-text text-transparent"
                            style={{
                              backgroundImage:
                                'linear-gradient(90deg, rgba(255,246,238,0.95), rgba(222,174,97,0.92), rgba(157,112,63,0.90))'
                            }}
                          >
                            {taglines[idx]}
                          </span>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
              <a href={anchorServicios} className="inline-flex">
                <button
                  className={cx(
                    'group relative inline-flex items-center justify-center',
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
                  <span className="relative z-10">Ver perfiles</span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                  >
                    <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-[rgba(255,246,238,0.35)] opacity-0 blur-md skew-x-[-12deg] group-hover:opacity-60 animate-[ray_1.2s_ease-out_infinite]" />
                  </span>
                </button>
              </a>

              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex"
                >
                  <button
                    className={cx(
                      'inline-flex items-center justify-center rounded-2xl px-6 py-3',
                      'text-sm md:text-base font-semibold',
                      'border border-[rgba(125,137,52,0.35)]',
                      'bg-[rgba(125,137,52,0.10)] backdrop-blur-xl',
                      'text-[rgba(255,246,238,0.90)]',
                      'hover:bg-[rgba(125,137,52,0.16)] transition'
                    )}
                  >
                    Solicitar presupuesto por WhatsApp
                  </button>
                </a>
              ) : (
                <a
                  href={anchorContacto}
                  className={cx(
                    'inline-flex items-center justify-center rounded-2xl px-6 py-3',
                    'text-sm md:text-base font-semibold',
                    'border border-white/10',
                    'bg-white/5 backdrop-blur-xl',
                    'text-white/85 hover:bg-white/7 transition'
                  )}
                >
                  Contacto
                </a>
              )}
            </div>
          </motion.div>

          {/* Right: “Proof / Flow card” */}
          <motion.div
            variants={enter}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            custom={0.08}
            className="relative"
          >
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[28px] blur-2xl opacity-55"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.22), rgba(157,112,63,0.10) 40%, rgba(0,0,0,0) 72%)'
              }}
            />

            <motion.div
              variants={floaty}
              initial="initial"
              animate="animate"
              className="relative rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.55)] overflow-hidden"
            >
              {/* top bar */}
              <div className="flex items-center justify-between px-5 pt-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_12px_rgba(222,174,97,0.45)]" />
                  <span className="text-[12px] uppercase tracking-[0.22em] text-white/70 font-messina">
                    pc nueva
                  </span>
                </div>

                <span
                  className="rounded-full px-3 py-1 text-[12px] border bg-black/20"
                  style={{
                    borderColor: 'rgba(222,174,97,0.22)',
                    color: 'rgba(255,246,238,0.72)'
                  }}
                >
                  a pedido
                </span>
              </div>

              {/* KPI row */}
              <div className="px-5 pt-4 grid grid-cols-3 gap-2">
                {[
                  { k: 'Perfil', v: '3 opciones', w: '76%' },
                  { k: 'Armado', v: 'Listo para usar', w: '68%' },
                  { k: 'Entrega', v: 'Con checklist', w: '60%' }
                ].map((it) => (
                  <div
                    key={it.k}
                    className="rounded-2xl border border-white/10 bg-black/15 px-3 py-3"
                  >
                    <div className="text-[10px] uppercase tracking-[0.20em] text-white/50">
                      {it.k}
                    </div>
                    <div className="mt-1 text-[13px] sm:text-[14px] font-semibold text-white/85">
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
                    <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[rgba(222,174,97,0.55)] animate-[bar_2.1s_ease-in-out_infinite]"
                        style={{ width: it.w }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* perfiles / incluye */}
              <div className="px-5 pb-6 pt-5">
                <div className="grid gap-2.5">
                  {features.map((r) => (
                    <div
                      key={r.title}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 px-4 py-3 bg-black/15"
                    >
                      <div
                        className="mt-0.5 h-9 w-9 rounded-2xl border bg-white/5 flex items-center justify-center"
                        style={{ borderColor: 'rgba(222,174,97,0.20)' }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_10px_rgba(222,174,97,0.35)]" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="text-[13px] sm:text-sm font-semibold text-white/85">
                            {r.title}
                          </div>
                          <span
                            className="text-[10px] uppercase tracking-[0.18em] rounded-full px-2 py-0.5 border bg-black/10"
                            style={{
                              borderColor: 'rgba(157,112,63,0.22)',
                              color: 'rgba(245,214,187,0.70)'
                            }}
                          >
                            {r.tag}
                          </span>
                        </div>

                        <div className="mt-1 text-[12px] sm:text-[13px] text-white/65 leading-relaxed">
                          {r.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* shimmer separator */}
                <div className="mt-5 h-px w-full bg-white/10 relative overflow-hidden rounded-full">
                  <div className="absolute -left-1/2 top-0 h-full w-1/2 bg-[rgba(222,174,97,0.45)] blur-md animate-[rayline_2.2s_ease-out_infinite]" />
                </div>

                <div className="mt-4 text-[12px] text-white/55">
                  Te enviamos la propuesta y coordinamos el armado. Si querés,
                  lo cerramos por WhatsApp en minutos.
                </div>
              </div>

              {/* corner accents */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full blur-3xl opacity-35"
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.26), rgba(0,0,0,0) 70%)'
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full blur-3xl opacity-30"
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(245,214,187,0.18), rgba(0,0,0,0) 72%)'
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ===== Marquee ===== */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[color:var(--pc-bg)] to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[color:var(--pc-bg)] to-transparent"
            />

            <div className="py-4">
              <div className="marquee motion-reduce:animate-none">
                <div className="marquee__track">
                  {marqueeItems.map((t) => (
                    <span
                      key={t}
                      className="mx-3 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/10 px-4 py-2 text-[12px] sm:text-[13px] text-white/75"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_10px_rgba(222,174,97,0.40)]" />
                      <span className="uppercase tracking-[0.18em]">{t}</span>
                    </span>
                  ))}
                </div>

                <div className="marquee__track" aria-hidden>
                  {marqueeItems.map((t) => (
                    <span
                      key={`dup-${t}`}
                      className="mx-3 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/10 px-4 py-2 text-[12px] sm:text-[13px] text-white/75"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_10px_rgba(222,174,97,0.40)]" />
                      <span className="uppercase tracking-[0.18em]">{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator para encastre con la sección siguiente */}
        <div className="mt-10 h-px w-full bg-white/10" />
      </div>

      {/* ===== Keyframes local ===== */}
      <style>{`
        @keyframes scan {
          0%   { transform: translateY(0); opacity: 0; }
          15%  { opacity: 0.9; }
          100% { transform: translateY(340px); opacity: 0; }
        }
        @keyframes bar {
          0%   { transform: translateX(-60%); opacity: 0.4; }
          50%  { opacity: 0.85; }
          100% { transform: translateX(60%); opacity: 0.4; }
        }
        @keyframes ray {
          0%   { transform: translateX(-40%) skewX(-12deg); opacity: 0; }
          15%  { opacity: .85; }
          100% { transform: translateX(40%)  skewX(-12deg); opacity: 0; }
        }
        @keyframes rayline {
          0%   { transform: translateX(-55%); opacity: 0; }
          25%  { opacity: 0.8; }
          100% { transform: translateX(55%); opacity: 0; }
        }
        .marquee {
          display: flex;
          width: 100%;
          overflow: hidden;
          user-select: none;
        }
        .marquee__track {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          animation: marquee 18s linear infinite;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
};

export default Banner;
