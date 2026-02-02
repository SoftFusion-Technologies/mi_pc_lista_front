import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import routes from '../Routes/Rutas';
import pcpro1 from '../assets/hero/pcpro.webp';
import pcestudio from '../assets/hero/pcestudio.webp';
import pctrabajo from '../assets/hero/pctrabajo.webp';
import { FaMousePointer } from 'react-icons/fa';

/**
 * HERO — PC EN MARCHA
 * - Usa paleta CSS vars: --pc-bg / --pc-surface / --pc-oro / --pc-oro-oscuro / --pc-crema / --pc-marfil / --pc-wsp
 * - Mantiene Framer Motion + rutas existentes
 * - Estilo: premium, cálido, glass + cobre/oro, órbitas (pero con iconografía PC)
 */

const enter = {
  hidden: { opacity: 0, y: 18, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 220, damping: 22 }
  }
};

const smash = {
  rest: {
    scale: 1,
    rotate: 0,
    letterSpacing: '0.02em',
    filter: 'brightness(1)'
  },
  hit: {
    scale: [1, 1.06, 0.995, 1],
    rotate: [0, -0.5, 0.25, 0],
    letterSpacing: ['0.02em', '0.08em', '0.03em', '0.02em'],
    filter: [
      'brightness(1)',
      'brightness(1.25)',
      'brightness(1.06)',
      'brightness(1)'
    ],
    transition: { duration: 0.6, times: [0, 0.2, 0.55, 1], ease: 'easeOut' }
  }
};

const clickBox = { left: '75.385%', top: '29.048%' };

// Helpers
const cx = (...c) => c.filter(Boolean).join(' ');

function HeroScreenCarousel({ images, intervalMs = 3200 }) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );

  const [i, setI] = useState(0);

  useEffect(() => {
    if (safeImages.length <= 1) return;
    const t = setInterval(() => {
      setI((prev) => (prev + 1) % safeImages.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [safeImages.length, intervalMs]);

  if (!safeImages.length) return null;

  return (
    <div className="relative h-full w-full">
      {/* “UI chrome” arriba (barra + dots) para que se sienta pantalla real */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-2.5 py-1.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/18" />
          <span className="h-2 w-2 rounded-full bg-white/12" />
        </div>

        <div className="flex items-center gap-1">
          {safeImages.map((_, idx) => (
            <span
              key={idx}
              className={[
                'h-1.5 w-1.5 rounded-full transition-opacity',
                idx === i ? 'bg-white/55 opacity-100' : 'bg-white/35 opacity-45'
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={safeImages[i]}
            src={safeImages[i]}
            alt=""
            className="h-full w-full object-cover"
            initial={{ opacity: 0, x: 10, scale: 0.995 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.995 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            draggable={false}
          />
        </AnimatePresence>

        {/* “glow” suave para integrarlo al estilo oro/marrón */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25" />
      </div>
    </div>
  );
}

const HeroSection = () => {
  // anim del “golpe” cuando entra en viewport
  const hitRef = useRef(null);
  const isIn = useInView(hitRef, { once: true, amount: 0.6 });

  // CTA: intentamos respetar tu routes actual, pero sin “casarnos” con un name fijo
  const primaryRoute = useMemo(() => {
    const preferredNames = [
      'Contacto',
      'Turno',
      'Presupuesto',
      'Solicitar Presupuesto',
      'WhatsApp',
      'Clase de Prueba' // compatibilidad con tu base actual
    ];
    return routes?.find?.((r) => preferredNames.includes(r?.name)) || null;
  }, []);

  // --------- SVGs (data-uri) en paleta PC EN MARCHA (oro/cobre sobre fondos cálidos) ---------
  const circuitPattern = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(222,174,97,0.22)"/>
          <stop offset="1" stop-color="rgba(157,112,63,0.16)"/>
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#g)" stroke-width="1.4" opacity="0.95">
        <path d="M20 40h60v40h60v-20h60" />
        <path d="M20 160h80v-40h40v60h60" />
        <path d="M40 20v60h40v60h-20v60" />
        <path d="M180 20v80h-40v40h60" />
        <circle cx="80" cy="80" r="4" fill="rgba(222,174,97,0.35)" stroke="rgba(222,174,97,0.18)"/>
        <circle cx="140" cy="80" r="4" fill="rgba(157,112,63,0.32)" stroke="rgba(157,112,63,0.16)"/>
        <circle cx="100" cy="120" r="4" fill="rgba(222,174,97,0.28)" stroke="rgba(222,174,97,0.14)"/>
        <circle cx="180" cy="140" r="4" fill="rgba(157,112,63,0.28)" stroke="rgba(157,112,63,0.14)"/>
      </g>
      <g opacity="0.55">
        <rect x="92" y="92" width="36" height="36" rx="8" fill="rgba(255,246,238,0.04)" stroke="rgba(245,214,187,0.14)"/>
        <path d="M100 110h20" stroke="rgba(245,214,187,0.16)" stroke-width="1.2"/>
        <path d="M110 100v20" stroke="rgba(245,214,187,0.16)" stroke-width="1.2"/>
      </g>
    </svg>
  `);

  const iconChip = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <g fill="none" stroke="rgba(255,246,238,0.78)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <rect x="18" y="18" width="28" height="28" rx="6" fill="rgba(222,174,97,0.10)" stroke="rgba(222,174,97,0.55)"/>
        <rect x="26" y="26" width="12" height="12" rx="3" fill="rgba(255,246,238,0.06)" stroke="rgba(245,214,187,0.35)"/>
        <path d="M24 10v6M32 10v6M40 10v6" />
        <path d="M24 48v6M32 48v6M40 48v6" />
        <path d="M10 24h6M10 32h6M10 40h6" />
        <path d="M48 24h6M48 32h6M48 40h6" />
      </g>
    </svg>
  `);

  const iconWrench = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <g fill="none" stroke="rgba(255,246,238,0.78)" stroke-width="3.0" stroke-linecap="round" stroke-linejoin="round">
        <path d="M38 10c-6 2-10 8-9 14l-14 14c-2 2-2 6 0 8s6 2 8 0l14-14c6 1 12-3 14-9l-8 2-5-5 2-8Z"
              fill="rgba(157,112,63,0.10)"
              stroke="rgba(222,174,97,0.55)"/>
        <path d="M21 43l-2 2" />
      </g>
    </svg>
  `);

  const iconShield = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <g fill="none" stroke="rgba(255,246,238,0.78)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 8l18 8v14c0 14-9 22-18 26C23 52 14 44 14 30V16l18-8Z"
              fill="rgba(222,174,97,0.10)"
              stroke="rgba(222,174,97,0.55)"/>
        <path d="M24 32l6 6 12-14" stroke="rgba(245,214,187,0.65)"/>
      </g>
    </svg>
  `);

  const iconBolt = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <g fill="none" stroke="rgba(255,246,238,0.78)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M34 6 14 34h16l-2 24 22-30H34l0-22Z"
              fill="rgba(157,112,63,0.10)"
              stroke="rgba(222,174,97,0.55)"/>
      </g>
    </svg>
  `);

  const heroIllustration = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 420">
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(222,174,97,0.55)"/>
          <stop offset="1" stop-color="rgba(157,112,63,0.35)"/>
        </linearGradient>
        <radialGradient id="spot" cx="35%" cy="30%" r="75%">
          <stop offset="0" stop-color="rgba(255,246,238,0.22)"/>
          <stop offset="1" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="520" height="420" rx="34" fill="rgba(255,246,238,0.03)" />
      <circle cx="170" cy="120" r="160" fill="url(#spot)" />

      <!-- monitor -->
      <rect x="130" y="90" width="270" height="180" rx="20" fill="rgba(45,28,27,0.55)" stroke="rgba(245,214,187,0.20)" stroke-width="2"/>
      <rect x="150" y="110" width="230" height="120" rx="14" fill="rgba(61,39,38,0.45)" stroke="rgba(222,174,97,0.22)" stroke-width="1.6"/>
      <path d="M170 170h90" stroke="rgba(245,214,187,0.30)" stroke-width="2" stroke-linecap="round"/>
      <path d="M170 190h150" stroke="rgba(245,214,187,0.22)" stroke-width="2" stroke-linecap="round"/>
      <path d="M170 210h120" stroke="rgba(245,214,187,0.18)" stroke-width="2" stroke-linecap="round"/>

      <!-- base -->
      <path d="M240 270h60l12 26H228l12-26Z" fill="rgba(157,112,63,0.18)" stroke="rgba(222,174,97,0.28)"/>
      <rect x="200" y="296" width="140" height="18" rx="9" fill="rgba(245,214,187,0.10)" stroke="rgba(245,214,187,0.16)"/>
 
    </svg>
  `);

  const heroFrames = [pcpro1, pcestudio, pctrabajo];

  // Coordenadas exactas de la pantalla interna del SVG (en %)
  const screenBox = {
    left: '28.846%',
    top: '26.190%',
    width: '44.231%',
    height: '28.571%'
  };

  const chipLeftBox = {
    left: '13.462%',
    top: '67.857%',
    width: '11.923%',
    height: '14.762%'
  };

  const chipRightBox = {
    left: '78.462%',
    top: '68.095%',
    width: '13.462%',
    height: '16.667%'
  };

  return (
    <section
      className={cx(
        'relative isolate overflow-hidden text-[color:var(--pc-marfil)]',
        'min-h-[88vh] md:min-h-[92vh]',
        'bg-[color:var(--pc-bg)]'
      )}
    >
      {/* ====== Background system (brand) ====== */}
      {/* circuit pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${circuitPattern}")`,
          backgroundSize: '240px 240px',
          backgroundRepeat: 'repeat',
          transform: 'rotate(6deg) scale(1.05)',
          filter: 'blur(0.25px)',
          maskImage:
            'radial-gradient(62% 52% at 50% 38%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'radial-gradient(62% 52% at 50% 38%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)'
        }}
      />

      {/* aurora blobs (oro/cobre) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-28 -left-28 size-[44rem] rounded-full blur-3xl opacity-70"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.26), rgba(157,112,63,0.12) 40%, rgba(0,0,0,0) 70%)'
          }}
        />
        <div
          className="absolute -bottom-36 -right-32 size-[48rem] rounded-full blur-3xl opacity-70"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(245,214,187,0.12), rgba(222,174,97,0.14) 45%, rgba(0,0,0,0) 72%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 42% at 50% 24%, rgba(255,246,238,0.12), rgba(0,0,0,0) 68%)'
          }}
        />
      </div>

      {/* subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(245,214,187,.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,214,187,.10) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage:
            'radial-gradient(60% 52% at 50% 40%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'radial-gradient(60% 52% at 50% 40%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)'
        }}
      />

      {/* noise scanlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,246,238,.45) 0, rgba(255,246,238,.45) 1px, transparent 1px, transparent 3px)'
        }}
      />

      {/* ====== Orbital system (PC icons) ====== */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* soft center halo */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '52vmin',
            height: '52vmin',
            background:
              'radial-gradient(circle at 50% 50%, rgba(222,174,97,0.10), rgba(0,0,0,0) 62%)',
            filter: 'blur(0.5px)'
          }}
        />

        {/* ===== Ring Guides + Glow layers ===== */}
        {/* Outer ring container */}
        <div className="absolute left-1/2 top-1/2 size-[74vmin] -translate-x-1/2 -translate-y-1/2">
          {/* base ring */}
          <div className="absolute inset-0 rounded-full border border-[rgba(245,214,187,0.14)]" />

          {/* dashed subtle ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '1px dashed rgba(245,214,187,0.10)',
              opacity: 0.65
            }}
          />

          {/* ring “breathing” glow */}
          <div
            className="absolute inset-[-10px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(222,174,97,0.12), rgba(0,0,0,0) 62%)',
              filter: 'blur(10px)',
              animation: 'ringPulse 4.6s ease-in-out infinite'
            }}
          />

          {/* moving bright arc (sweep) */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              WebkitMaskImage:
                'radial-gradient(circle, transparent 62%, #000 63%, #000 66%, transparent 67%)',
              maskImage:
                'radial-gradient(circle, transparent 62%, #000 63%, #000 66%, transparent 67%)',
              background:
                'conic-gradient(from 0deg, rgba(0,0,0,0) 0 82%, rgba(222,174,97,0.20) 86%, rgba(245,214,187,0.18) 92%, rgba(0,0,0,0) 100%)',
              filter: 'blur(0.6px)',
              animation: 'glowRotate 10s linear infinite'
            }}
          />
        </div>

        {/* Inner ring container */}
        <div className="absolute left-1/2 top-1/2 size-[56vmin] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 rounded-full border border-[rgba(245,214,187,0.10)]" />

          <div
            className="absolute inset-[-10px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(222,174,97,0.08), rgba(0,0,0,0) 62%)',
              filter: 'blur(10px)',
              animation: 'ringPulse 5.4s ease-in-out infinite',
              opacity: 0.9
            }}
          />

          <div
            className="absolute inset-0 rounded-full"
            style={{
              WebkitMaskImage:
                'radial-gradient(circle, transparent 60%, #000 61%, #000 64%, transparent 65%)',
              maskImage:
                'radial-gradient(circle, transparent 60%, #000 61%, #000 64%, transparent 65%)',
              background:
                'conic-gradient(from 140deg, rgba(0,0,0,0) 0 78%, rgba(222,174,97,0.16) 84%, rgba(245,214,187,0.14) 90%, rgba(0,0,0,0) 100%)',
              filter: 'blur(0.6px)',
              animation: 'glowRotate 14s linear infinite reverse'
            }}
          />
        </div>

        {/* tiny sparkles (static positions, subtle twinkle) */}
        {[
          { l: '18%', t: '28%', s: 6, d: 0.0 },
          { l: '78%', t: '20%', s: 5, d: 0.7 },
          { l: '85%', t: '62%', s: 6, d: 0.35 },
          { l: '22%', t: '72%', s: 5, d: 0.9 }
        ].map((st, idx) => (
          <div
            key={idx}
            className="absolute rounded-full"
            style={{
              left: st.l,
              top: st.t,
              width: st.s,
              height: st.s,
              background: 'rgba(245,214,187,0.20)',
              boxShadow:
                '0 0 10px rgba(222,174,97,0.18), 0 0 18px rgba(245,214,187,0.10)',
              transform: 'translate(-50%, -50%)',
              animation: `sparkle 3.8s ease-in-out ${st.d}s infinite`
            }}
          />
        ))}

        {/* ===== ring 1 (clockwise) ===== */}
        <div className="absolute left-1/2 top-1/2 size-[74vmin] -translate-x-1/2 -translate-y-1/2 animate-[orbit_28s_linear_infinite]">
          {[
            { pos: 'top', svg: iconChip, s: 42 },
            { pos: 'right', svg: iconShield, s: 42 },
            { pos: 'bottom', svg: iconWrench, s: 42 },
            { pos: 'left', svg: iconBolt, s: 42 }
          ].map((it) => (
            <div
              key={it.pos}
              className={cx(
                'absolute',
                it.pos === 'top' &&
                  'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2',
                it.pos === 'right' &&
                  'right-0 top-1/2 translate-x-1/2 -translate-y-1/2',
                it.pos === 'bottom' &&
                  'left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2',
                it.pos === 'left' &&
                  'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2'
              )}
              style={{
                width: `${it.s}px`,
                height: `${it.s}px`,
                backgroundImage: `url("data:image/svg+xml;utf8,${it.svg}")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                filter:
                  'drop-shadow(0 0 12px rgba(222,174,97,0.22)) drop-shadow(0 0 22px rgba(245,214,187,0.12))',
                transform: 'translate(-50%,-50%) rotate(10deg)'
              }}
            />
          ))}
        </div>

        {/* ===== ring 2 (counter) ===== */}
        <div className="absolute left-1/2 top-1/2 size-[56vmin] -translate-x-1/2 -translate-y-1/2 animate-[orbit_reverse_36s_linear_infinite]">
          {[
            { pos: 'top', svg: iconShield, s: 36 },
            { pos: 'bottom', svg: iconChip, s: 36 }
          ].map((it) => (
            <div
              key={it.pos}
              className={cx(
                'absolute',
                it.pos === 'top' &&
                  'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2',
                it.pos === 'bottom' &&
                  'left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2'
              )}
              style={{
                width: `${it.s}px`,
                height: `${it.s}px`,
                backgroundImage: `url("data:image/svg+xml;utf8,${it.svg}")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                filter:
                  'drop-shadow(0 0 10px rgba(222,174,97,0.20)) drop-shadow(0 0 18px rgba(245,214,187,0.10))',
                transform: 'translate(-50%,-50%) rotate(10deg)'
              }}
            />
          ))}
        </div>
      </div>

      {/* ====== CONTENT ====== */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: copy */}
          <div className="text-left">
            {/* Benjamin Orellana - 2026-02-02 - Ajuste de copy: menos técnico, más dolor real + confianza + CTA a WhatsApp/presupuesto. */}
            <motion.div
              variants={enter}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(245,214,187,0.18)] bg-[rgba(255,246,238,0.04)] px-4 py-2 backdrop-blur-md"
            >
              <span className="font-bignoodle tracking-[0.22em] text-[11px] uppercase crema">
                PC rápidas y sin complicaciones
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-amarillo shadow-[0_0_12px_rgba(222,174,97,0.45)]" />
              <span className="text-[12px] text-[rgba(255,246,238,0.70)]">
                Contanos qué más o menos que necesitas y te pasamos presupuesto
                por WhatsApp
              </span>
            </motion.div>

            <motion.h1
              variants={enter}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-6xl leading-[1.04]"
            >
              <span className="titulo block">
                PC
                <span className="ml-3 inline-block">
                  <motion.span
                    ref={hitRef}
                    variants={smash}
                    initial="rest"
                    animate={isIn ? 'hit' : 'rest'}
                    className="relative inline-block align-baseline"
                  >
                    <span
                      className="relative z-10 bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          'linear-gradient(90deg, rgba(255,246,238,0.95), rgba(222,174,97,0.92), rgba(157,112,63,0.90))',
                        textShadow: '0 14px 50px rgba(222,174,97,0.12)'
                      }}
                    >
                      EN MARCHA
                    </span>

                    {/* halo ring */}
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border"
                      style={{
                        borderColor: 'rgba(222,174,97,0.30)',
                        animation: 'pulse-ring 2.6s ease-out infinite'
                      }}
                    />
                  </motion.span>
                </span>
              </span>

              <span className="cuerpo block mt-3 text-[15px] sm:text-base md:text-lg text-[rgba(255,246,238,0.74)] max-w-xl">
                Si tu PC está lenta, se traba o no rinde, la dejamos funcionando
                como debe. Presupuesto antes de avanzar y explicación simple de
                lo que se hizo.
              </span>
            </motion.h1>

            <motion.div
              variants={enter}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.05 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center"
            >
              {/* Primary CTA */}
              {primaryRoute ? (
                <NavLink to={primaryRoute.path} className="inline-flex">
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
                    <span className="relative z-10">SOLICITAR PRESUPUESTO</span>

                    {/* shimmer */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                    >
                      <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-[rgba(255,246,238,0.35)] opacity-0 blur-md skew-x-[-12deg] group-hover:opacity-60 animate-[ray_1.2s_ease-out_infinite]" />
                    </span>
                  </button>
                </NavLink>
              ) : (
                <a href="#contacto" className="inline-flex">
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
                    <span className="relative z-10">CONTACTAR AHORA</span>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                    >
                      <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-[rgba(255,246,238,0.35)] opacity-0 blur-md skew-x-[-12deg] group-hover:opacity-60 animate-[ray_1.2s_ease-out_infinite]" />
                    </span>
                  </button>
                </a>
              )}

              {/* Secondary CTA */}
              <a
                href="#perfiles"
                className={cx(
                  'inline-flex items-center justify-center rounded-2xl px-6 py-3',
                  'text-sm md:text-base font-semibold',
                  'border border-[rgba(245,214,187,0.18)]',
                  'bg-[rgba(255,246,238,0.03)] backdrop-blur-md',
                  'text-[rgba(255,246,238,0.85)]',
                  'hover:bg-[rgba(255,246,238,0.05)] transition'
                )}
              >
                Ver perfiles
              </a>
            </motion.div>

            {/* Value chips */}
            <motion.div
              variants={enter}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.1 }}
              className="mt-8 flex flex-wrap items-center gap-2.5"
            >
              {/* Value chips (solo textos) */}
              {[
                { t: 'Solicitar presupuesto', s: 'rgba(222,174,97,0.16)' },
                { t: 'Si está lenta o se traba', s: 'rgba(245,214,187,0.14)' },
                { t: 'Trabajo a pedido', s: 'rgba(157,112,63,0.16)' },
                { t: 'Componentes confiables', s: 'rgba(222,174,97,0.14)' }
              ].map((c) => (
                <span
                  key={c.t}
                  className="rounded-full px-3 py-1 text-[12px] sm:text-[13px] border bg-[rgba(0,0,0,0.12)] backdrop-blur-md"
                  style={{ borderColor: c.s, color: 'rgba(255,246,238,0.78)' }}
                >
                  {c.t}
                </span>
              ))}
            </motion.div>

            {/* small note */}
            <motion.p
              variants={enter}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.14 }}
              className="mt-6 text-[12px] sm:text-[13px] text-[rgba(255,246,238,0.58)]"
            >
              Si está lenta, se reinicia, se traba o levanta temperatura: lo
              diagnosticamos, lo dejamos estable y te explicamos el por qué.
            </motion.p>
          </div>

          {/* Right: visual card */}
          <motion.div
            variants={enter}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="relative"
          >
            {/* outer glow */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[28px] blur-2xl opacity-55"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.20), rgba(157,112,63,0.10) 42%, rgba(0,0,0,0) 72%)'
              }}
            />

            <div
              className={cx(
                'relative rounded-[28px] border',
                'bg-[rgba(255,246,238,0.04)] backdrop-blur-xl',
                'shadow-[0_30px_90px_rgba(0,0,0,0.55)]',
                'overflow-hidden'
              )}
              style={{ borderColor: 'rgba(245,214,187,0.18)' }}
            >
              {/* top ribbon */}
              <div className="flex items-center justify-between px-5 pt-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[rgba(222,174,97,0.85)] shadow-[0_0_12px_rgba(222,174,97,0.45)]" />
                  <span className="text-[12px] uppercase tracking-[0.20em] text-[rgba(255,246,238,0.68)] font-messina">
                    PC EN MARCHA
                  </span>
                </div>
              </div>

              {/* illustration */}
              <div className="px-5 pt-4">
                <div
                  className="relative w-full rounded-2xl border overflow-hidden"
                  style={{ borderColor: 'rgba(245,214,187,0.14)' }}
                >
                  <div
                    className="absolute inset-0 opacity-70"
                    style={{
                      background:
                        'radial-gradient(60% 60% at 40% 30%, rgba(222,174,97,0.12), rgba(0,0,0,0) 70%)'
                    }}
                  />

                  <div className="relative aspect-[520/420] w-full">
                    {/* Overlay: mouse click indicator (arriba de TODO) */}
                    <div
                      className="absolute z-[30] pointer-events-none"
                      style={{
                        left: clickBox.left,
                        top: clickBox.top,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="relative">
                        {/* Pulse rings */}
                        <motion.span
                          className="absolute inset-0 rounded-full"
                          style={{
                            boxShadow: '0 0 0 1px rgba(222,174,97,0.28)'
                          }}
                          animate={{ scale: [1, 1.35], opacity: [0.55, 0] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: 'easeOut'
                          }}
                        />
                        <motion.span
                          className="absolute inset-0 rounded-full"
                          style={{
                            boxShadow: '0 0 0 1px rgba(222,174,97,0.20)'
                          }}
                          animate={{ scale: [1, 1.6], opacity: [0.35, 0] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: 'easeOut',
                            delay: 0.18
                          }}
                        />

                        {/* Core bubble */}
                        <div
                          className="relative grid place-items-center rounded-full border backdrop-blur-sm"
                          style={{
                            width: 'clamp(52px, 9vw, 86px)',
                            height: 'clamp(52px, 9vw, 86px)',
                            background: 'rgba(222,174,97,0.10)',
                            borderColor: 'rgba(222,174,97,0.35)',
                            boxShadow: '0 18px 50px rgba(0,0,0,0.45)'
                          }}
                        >
                          {/* “click” micro motion */}
                          <motion.div
                            animate={{ y: [0, 2, 0], rotate: [-6, -4, -6] }}
                            transition={{
                              duration: 1.15,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                          >
                            <FaMousePointer
                              style={{ color: 'rgba(245,214,187,0.85)' }}
                              className="text-[18px] sm:text-[22px]"
                            />
                          </motion.div>

                          {/* tiny click dot */}
                          <motion.span
                            className="absolute right-[18%] top-[20%] h-2 w-2 rounded-full"
                            style={{ background: 'rgba(222,174,97,0.55)' }}
                            animate={{
                              scale: [1, 0.6, 1],
                              opacity: [0.9, 0.45, 0.9]
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Chips flotantes (arriba del SVG y carrusel) */}
                    <motion.div
                      className="absolute z-[25] pointer-events-none"
                      style={chipLeftBox}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      <div
                        className="h-full w-full rounded-2xl border backdrop-blur-sm"
                        style={{
                          background: 'rgba(61,39,38,0.30)',
                          borderColor: 'rgba(222,174,97,0.24)',
                          boxShadow: '0 18px 45px rgba(0,0,0,0.40)'
                        }}
                      >
                        <div className="h-full w-full p-[18%] flex flex-col justify-between">
                          <div
                            className="h-1 rounded-full"
                            style={{ background: 'rgba(245,214,187,0.26)' }}
                          />
                          <div
                            className="h-1 rounded-full w-[80%]"
                            style={{ background: 'rgba(245,214,187,0.22)' }}
                          />
                          <div
                            className="h-1 rounded-full w-[65%]"
                            style={{ background: 'rgba(245,214,187,0.18)' }}
                          />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute z-[25] pointer-events-none"
                      style={chipRightBox}
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 3.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.35
                      }}
                    >
                      <div
                        className="h-full w-full rounded-2xl border backdrop-blur-sm"
                        style={{
                          background: 'rgba(61,39,38,0.28)',
                          borderColor: 'rgba(157,112,63,0.22)',
                          boxShadow: '0 18px 45px rgba(0,0,0,0.40)'
                        }}
                      >
                        <div className="h-full w-full p-[16%] flex flex-col justify-between">
                          <div
                            className="h-1 rounded-full w-[70%]"
                            style={{ background: 'rgba(245,214,187,0.22)' }}
                          />
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className="h-1 rounded-full w-[55%]"
                              style={{ background: 'rgba(245,214,187,0.18)' }}
                            />
                            <span
                              className="h-1 rounded-full w-[25%]"
                              style={{ background: 'rgba(222,174,97,0.22)' }}
                            />
                          </div>
                          <motion.div
                            className="h-2 w-2 rounded-full self-end"
                            style={{ background: 'rgba(222,174,97,0.30)' }}
                            animate={{
                              scale: [1, 0.75, 1],
                              opacity: [0.9, 0.55, 0.9]
                            }}
                            transition={{
                              duration: 1.1,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Fondo SVG */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,${heroIllustration}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />

                    {/* Overlay: “pantalla” del monitor */}
                    <div
                      className="absolute overflow-hidden rounded-[14px]"
                      style={screenBox}
                    >
                      <div
                        className="h-full w-full"
                        style={{
                          boxShadow: '0 14px 40px rgba(0,0,0,0.45)',
                          background: 'rgba(10,10,10,0.25)'
                        }}
                      >
                        <HeroScreenCarousel
                          images={heroFrames}
                          intervalMs={3200}
                        />
                      </div>

                      {/* borde fino encima para que no “tape” el stroke del svg */}
                      <div
                        className="pointer-events-none absolute inset-0 rounded-[14px] ring-1"
                        style={{ color: 'rgba(222,174,97,0.22)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* bullet list */}
              <div className="px-5 pb-6 pt-5">
                <div className="grid gap-2.5">
                  {[
                    {
                      k: 'Tu PC vuelve a rendir',
                      v: 'La dejamos rápida para trabajar, estudiar o usarla sin frustración.',
                      tag: 'PRO'
                    },
                    {
                      k: 'Sin complicaciones',
                      v: 'Encontramos la causa y lo solucionamos para que sea estable.',
                      tag: 'CHECK'
                    },
                    {
                      k: 'Trabajo a pedido',
                      v: 'Si hace falta cambiar algo, se elige con vos y se compra en locales confiables.',
                      tag: 'CLEAR'
                    }
                  ].map((r) => (
                    <div
                      key={r.k}
                      className="flex items-start gap-3 rounded-2xl border px-4 py-3 bg-[rgba(0,0,0,0.12)]"
                      style={{ borderColor: 'rgba(245,214,187,0.14)' }}
                    >
                      <div
                        className="mt-0.5 h-9 w-9 rounded-xl border bg-[rgba(255,246,238,0.03)] flex items-center justify-center"
                        style={{ borderColor: 'rgba(222,174,97,0.22)' }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[rgba(222,174,97,0.85)] shadow-[0_0_10px_rgba(222,174,97,0.35)]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="text-[13px] sm:text-sm font-semibold text-[rgba(255,246,238,0.86)]">
                            {r.k}
                          </div>
                          {/* <span
                            className="text-[10px] uppercase tracking-[0.18em] rounded-full px-2 py-0.5 border"
                            style={{
                              borderColor: 'rgba(157,112,63,0.22)',
                              color: 'rgba(245,214,187,0.70)',
                              background: 'rgba(0,0,0,0.10)'
                            }}
                          >
                            {r.tag}
                          </span> */}
                        </div>
                        <div className="mt-1 text-[12px] sm:text-[13px] text-[rgba(255,246,238,0.62)] leading-relaxed">
                          {r.v}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* micro footer */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-[rgba(255,246,238,0.55)]">
                  <span
                    className="rounded-full border px-3 py-1 bg-[rgba(255,246,238,0.03)]"
                    style={{ borderColor: 'rgba(245,214,187,0.14)' }}
                  >
                    Trabajo a pedido
                  </span>
                  <span
                    className="rounded-full border px-3 py-1 bg-[rgba(255,246,238,0.03)]"
                    style={{ borderColor: 'rgba(245,214,187,0.14)' }}
                  >
                    Presupuesto por WhatsApp
                  </span>
                  <span
                    className="rounded-full border px-3 py-1 bg-[rgba(255,246,238,0.03)]"
                    style={{ borderColor: 'rgba(245,214,187,0.14)' }}
                  >
                    Componentes en locales confiables{' '}
                  </span>
                </div>
              </div>

              {/* corner accents */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-12 -right-14 size-56 rounded-full blur-3xl opacity-40"
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.26), rgba(0,0,0,0) 70%)'
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full blur-3xl opacity-35"
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(245,214,187,0.16), rgba(0,0,0,0) 72%)'
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* subtle scroll hint */}
        <div className="mt-12 flex items-center justify-center">
          <div className="flex items-center gap-3 text-[12px] text-[rgba(255,246,238,0.55)]">
            <span className="h-px w-10 bg-[rgba(245,214,187,0.20)]" />
            <span className="uppercase tracking-[0.24em]">
              deslizá para ver más
            </span>
            <span className="h-px w-10 bg-[rgba(245,214,187,0.20)]" />
          </div>
        </div>
      </div>

      {/* Keyframes (mantiene tu idea + agrega orbit) */}
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: translate(-50%, -50%) scale(0.35); opacity: 0.75; }
          70%  { transform: translate(-50%, -50%) scale(3.2); opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes orbit {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes orbit_reverse {
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: .55; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: .9; transform: translate(-50%, -50%) scale(1.015); }
        }

        @keyframes glowRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: .15; transform: translate(-50%, -50%) scale(.9); }
          50% { opacity: .55; transform: translate(-50%, -50%) scale(1.05); }
        }
        .animate-[orbit_28s_linear_infinite] {
          animation: orbit 28s linear infinite;
          transform-origin: center;
        }
        .animate-[orbit_reverse_36s_linear_infinite] {
          animation: orbit_reverse 36s linear infinite;
          transform-origin: center;
        }
        /* shimmer */
        @keyframes ray {
          0%   { transform: translateX(-40%) skewX(-12deg); opacity: 0; }
          15%  { opacity: .85; }
          100% { transform: translateX(40%)  skewX(-12deg); opacity: 0; }
        показать
      `}</style>
    </section>
  );
};

export default HeroSection;
