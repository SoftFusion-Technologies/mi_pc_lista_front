import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsAppCta({
  whatsappHref,
  label = 'TE AYUDAMOS A ELEGIR BIEN',
  className = ''
}) {
  const reduceMotion = useReducedMotion();

  if (!whatsappHref) return null;

  const pulseAnim = reduceMotion
    ? undefined
    : { opacity: [0.18, 0.55, 0.18], scale: [0.96, 1.08, 0.96] };

  const ringAnim = reduceMotion
    ? undefined
    : { opacity: [0.0, 0.55, 0.0], scale: [0.88, 1.25, 0.88] };

  const ctaAnim = reduceMotion ? undefined : { scale: [1, 1.03, 1] };

  const tr = reduceMotion
    ? undefined
    : { duration: 2.1, repeat: Infinity, ease: 'easeInOut' };

  return (
    <div className="fixed z-[80] right-5 bottom-5 md:right-7 md:bottom-7">
      <div className="relative">
        {/* Halo blur (titila) */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 rounded-[26px] bg-[color:var(--pc-oro)]/25 blur-md"
          animate={pulseAnim}
          transition={tr}
        />

        {/* Ring (titila) */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 rounded-[30px] border border-[color:var(--pc-oro)]/35"
          animate={ringAnim}
          transition={{ ...tr, ease: 'easeOut' }}
        />

        {/* CTA (idéntico al tuyo + breathing suave) */}
        <motion.a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={[
            `
            group relative overflow-hidden rounded-2xl
            px-4 py-2.5
            font-extrabold text-[12px] tracking-[0.14em] uppercase
            text-[color:var(--pc-bg)]
            bg-gradient-to-r from-[color:var(--pc-oro)] to-[color:var(--pc-oro-oscuro)]
            shadow-[0_16px_40px_rgba(0,0,0,0.35)]
            transition
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pc-oro)]/55
            `,
            className
          ].join(' ')}
          animate={ctaAnim}
          transition={tr}
          whileHover={{ y: -1, filter: 'brightness(1.10)' }}
          whileTap={{ y: 0, scale: 0.99 }}
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            <FaWhatsapp />
            {label}
          </span>

          {/* Shine hover (igual al tuyo) */}
          <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </motion.a>
      </div>
    </div>
  );
}
