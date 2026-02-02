import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  FaTimes,
  FaWhatsapp,
  FaShieldAlt,
  FaBolt,
  FaCheckCircle,
  FaTools
} from 'react-icons/fa';

const backdropV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const panelV = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 28 }
  },
  exit: { opacity: 0, y: 10, scale: 0.985, transition: { duration: 0.16 } }
};

export default function WelcomeModal({
  open,
  onClose,
  whatsappHref,
  zona = '',
  title = 'Tu PC vuelve a rendir',
  subtitle = 'Si está lenta, se traba o no rinde: la revisamos, te decimos qué conviene y la dejamos andando. Escribinos por WhatsApp.'
}) {
  const reduceMotion = useReducedMotion();
  const closeBtnRef = useRef(null);

  // Benjamin Orellana - 2026-02-02 - Bloquea scroll del body mientras la modal está abierta para una experiencia más profesional.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Benjamin Orellana - 2026-02-02 - Accesibilidad: foco inicial en el botón cerrar y cierre con Escape.
  useEffect(() => {
    if (!open) return;

    const t = setTimeout(() => closeBtnRef.current?.focus?.(), 0);

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const glowAnim = reduceMotion
    ? undefined
    : { opacity: [0.18, 0.45, 0.18], scale: [0.99, 1.03, 0.99] };

  // Benjamin Orellana - 2026-02-02 - Fallback seguro del link de WhatsApp para evitar href inválido y mantener UX consistente.
  const safeWhatsappHref = whatsappHref || '#';

  // Benjamin Orellana - 2026-02-02 - Copy orientado a dolores reales del cliente (lenta, se traba, no rinde) para comunicar valor rápido y llevar a WhatsApp.
  const painPoints = [
    'PC lenta o se queda pensando',
    'Se traba, se cuelga o reinicia',
    'Programas que tardan o no abren',
    'Virus, ventanas raras o publicidades'
  ];

  // Benjamin Orellana - 2026-02-02 - Beneficios (no tecnicismos) para transmitir seriedad y confianza sin sobre-explicar.
  const trustItems = [
    {
      icon: <FaCheckCircle />,
      t: 'Diagnóstico claro',
      d: 'Te explicamos el problema en simple y qué conviene hacer.'
    },
    {
      icon: <FaTools />,
      t: 'Presupuesto antes',
      d: 'Sin sorpresas: te pasamos opciones y costo antes de avanzar.'
    },
    {
      icon: <FaShieldAlt />,
      t: 'Transparencia',
      d: 'Te mantenemos al tanto del avance y del resultado.'
    }
  ];

  // Servicios (chips)
  const services = [
    'Optimización',
    'Limpieza y mantenimiento',
    'Formateo con backup',
    'Instalación y drivers',
    'Diagnóstico',
    'Soporte'
  ];

  // Benjamin Orellana - 2026-02-02 - Proceso ultra simple para reducir fricción y empujar contacto por WhatsApp.
  const steps = [
    {
      t: '1) Nos escribís',
      d: 'Contanos qué pasa (si podés, una foto o video corto).'
    },
    {
      t: '2) Te guiamos',
      d: 'Te pedimos 2 o 3 datos y te damos un plan claro.'
    },
    {
      t: '3) Coordinamos',
      d: 'Acordamos el paso siguiente y lo resolvemos sin vueltas.'
    }
  ];

  const headingId = 'welcome-modal-title';
  const descId = 'welcome-modal-desc';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[95] flex items-center justify-center px-4"
        variants={backdropV}
        initial="hidden"
        animate="visible"
        exit="hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={descId}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-[6px]"
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          variants={panelV}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="
            relative w-full max-w-[920px]
            rounded-3xl overflow-hidden
            border border-white/10
            bg-[color:var(--pc-surface)]/92
            shadow-[0_30px_100px_rgba(0,0,0,0.65)]
          "
        >
          {/* Premium top glow */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[520px] -translate-x-1/2 rounded-full bg-[color:var(--pc-accent,#53CEF6)]/16 blur-3xl"
            animate={glowAnim}
            transition={
              reduceMotion
                ? undefined
                : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
            }
          />

          {/* Subtle gradient frame */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-white/0 to-white/5" />

          {/* Close */}
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="
              absolute right-4 top-4 z-10
              inline-flex h-10 w-10 items-center justify-center
              rounded-2xl border border-white/10 bg-white/5
              text-white/80 hover:text-white hover:bg-white/10 transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20
            "
            aria-label="Cerrar"
          >
            <FaTimes />
          </button>

          {/* Benjamin Orellana - 2026-02-02 - Panel con alto máximo y scroll interno para mobile: evita cortes y mantiene CTA accesible. */}
          <div className="relative max-h-[88vh] overflow-y-auto overscroll-contain">
            <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
              {/* Left: Mensaje comercial */}
              <div className="p-6 md:p-8 lg:p-9">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-white/85 text-[11px] font-extrabold tracking-[0.22em] uppercase">
                    PC en Marcha
                  </div>
                  {zona ? (
                    <div className="text-white/60 text-[11px] font-semibold">
                      {zona}
                    </div>
                  ) : null}
                </div>

                <h2
                  id={headingId}
                  className="mt-4 text-white text-[26px] md:text-[32px] font-black leading-tight"
                >
                  {title}
                </h2>

                <p
                  id={descId}
                  className="mt-2 text-white/75 text-[13px] md:text-[14px] leading-relaxed max-w-[62ch]"
                >
                  {subtitle}
                </p>

                {/* Pain points (rápido de entender) */}
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-white/85 text-[12px] font-extrabold tracking-[0.16em] uppercase">
                    ¿Te pasa esto?
                  </div>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {painPoints.map((t) => (
                      <div
                        key={t}
                        className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                      >
                        <div className="mt-0.5 text-[color:var(--pc-accent,#53CEF6)]">
                          <FaBolt />
                        </div>
                        <div className="text-white/80 text-[12px] leading-relaxed">
                          {t}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA (más temprano y directo) */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={safeWhatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onClose?.()}
                    className="
                      group relative overflow-hidden rounded-2xl
                      px-5 py-3
                      font-extrabold text-[12px] tracking-[0.14em] uppercase
                      text-[color:var(--pc-bg)]
                      bg-gradient-to-r from-[color:var(--pc-oro)] to-[color:var(--pc-oro-oscuro)]
                      shadow-[0_16px_40px_rgba(0,0,0,0.35)]
                      hover:brightness-110 hover:-translate-y-[1px] active:translate-y-0 transition
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pc-oro)]/55
                      inline-flex items-center justify-center gap-2
                      w-full sm:w-auto
                      disabled:opacity-60 disabled:pointer-events-none
                    "
                    aria-disabled={!whatsappHref}
                  >
                    <FaWhatsapp />
                    Escribir por WhatsApp
                    <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  </a>

                  <button
                    onClick={onClose}
                    className="
                      rounded-2xl px-5 py-3
                      border border-white/10 bg-white/5
                      text-white/85 font-extrabold text-[12px] tracking-[0.14em] uppercase
                      hover:bg-white/10 hover:text-white transition
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20
                      w-full sm:w-[220px]
                    "
                  >
                    Ver la web
                  </button>
                </div>

                {/* Trust row */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {trustItems.map((x) => (
                    <div
                      key={x.t}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-[color:var(--pc-accent,#53CEF6)]">
                          {x.icon}
                        </div>
                        <div>
                          <div className="text-white font-extrabold text-[13px]">
                            {x.t}
                          </div>
                          <div className="text-white/70 text-[12px] leading-relaxed">
                            {x.d}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-6" />
              </div>

              {/* Right: Panel visual/proceso */}
              <div className="relative border-t lg:border-t-0 lg:border-l border-white/10 p-6 md:p-8 lg:p-9">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/10" />
                </div>

                <div className="relative">
                  <div className="text-white/85 text-[12px] font-extrabold tracking-[0.16em] uppercase">
                    Cómo lo resolvemos
                  </div>

                  <div className="mt-4 space-y-3">
                    {steps.map((x) => (
                      <div
                        key={x.t}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 text-[color:var(--pc-accent,#53CEF6)]">
                            <FaBolt />
                          </div>
                          <div>
                            <div className="text-white font-extrabold text-[13px]">
                              {x.t}
                            </div>
                            <div className="text-white/70 text-[12px] leading-relaxed">
                              {x.d}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-white font-extrabold text-[13px]">
                      Atajo recomendado
                    </div>
                    <div className="mt-1 text-white/70 text-[12px] leading-relaxed">
                      Escribinos por WhatsApp y te guiamos para resolverlo sin
                      perder tiempo.
                    </div>

                    <a
                      href={safeWhatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => onClose?.()}
                      className="
                        mt-3 inline-flex w-full items-center justify-center gap-2
                        rounded-2xl border border-white/10 bg-white/5
                        px-4 py-2.5
                        text-white font-extrabold text-[12px] tracking-[0.14em] uppercase
                        hover:bg-white/10 transition
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20
                        disabled:opacity-60 disabled:pointer-events-none
                      "
                      aria-disabled={!whatsappHref}
                    >
                      <FaWhatsapp />
                      Abrir WhatsApp
                    </a>
                  </div>

                  {/* Benjamin Orellana - 2026-02-02 - Micro nota de confianza: refuerza que la consulta inicial es simple y orientada a solución. */}
                  <div className="mt-4 text-white/55 text-[11px] leading-relaxed">
                    Contanos el síntoma y te respondemos con una guía clara para
                    que tu PC vuelva a funcionar bien.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
