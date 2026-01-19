import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ServiciosSection — Mi PC Lista (selector de perfiles)
 * Objetivo:
 * - Selector de 3 presupuestos (Estudio / Trabajo / Exigencia)
 * - Mostrar specs + servicios + garantía
 * - Pedidos dentro de Córdoba Capital
 *
 * Uso:
 * <ServiciosSection whatsappUrl="https://wa.me/549351xxxxxxx" />
 * o
 * <ServiciosSection />
 */

const cx = (...c) => c.filter(Boolean).join(' ');

const V = {
  section: {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
  },
  grid: {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } }
  },
  card: {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  },
  modalBackdrop: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.22 } },
    exit: { opacity: 0, transition: { duration: 0.18 } }
  },
  modalPanel: {
    hidden: { opacity: 0, y: 18, scale: 0.985, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.26, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      y: 18,
      scale: 0.985,
      filter: 'blur(6px)',
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  }
};

function buildWhatsAppLink(baseUrl, message) {
  if (!baseUrl) return '';
  const hasQuery = baseUrl.includes('?');
  const sep = hasQuery ? '&' : '?';
  // Si el link ya incluye text=, lo dejamos y solo reemplazamos agregando al final
  if (baseUrl.includes('text=')) {
    return `${baseUrl}%0A%0A${encodeURIComponent(message)}`;
  }
  return `${baseUrl}${sep}text=${encodeURIComponent(message)}`;
}

function scrollToHash(hash) {
  if (!hash) return;
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  else window.location.hash = hash;
}

export default function ServiciosSection({
  id = 'servicios',
  whatsappUrl = '',
  contactoHash = '#contacto',
  // Override opcional si después querés traer perfiles desde API/JSON:
  perfiles: perfilesProp
}) {
  const perfiles = useMemo(() => {
    if (Array.isArray(perfilesProp) && perfilesProp.length) return perfilesProp;

    // Defaults: copy “comercial” (sin repetir Hero)
    return [
      {
        id: 'estudio',
        nombre: 'PC para Estudiar',
        tag: 'ESTUDIO',
        subtitle:
          'Lista para tareas diarias, clases, navegación y herramientas básicas.',
        highlights: [
          'Fluidez en uso diario',
          'Configuración lista para usar',
          'Ideal primer equipo'
        ],
        specs: [
          { k: 'CPU', v: 'Gama de entrada (equivalente) para uso diario' },
          { k: 'RAM', v: '8–16 GB (según necesidad)' },
          { k: 'Almacenamiento', v: 'SSD para arranque y apertura rápida' },
          { k: 'Enfoque', v: 'Estabilidad + velocidad en lo esencial' }
        ],
        incluye: [
          'Armado y test de componentes',
          'Instalación y configuración inicial',
          'Drivers + ajustes base',
          'Cuenta lista y configuración de uso'
        ],
        garantia: [
          'Garantía de armado y configuración',
          'Checklist de entrega',
          'Soporte post-entrega (coordinado)'
        ]
      },
      {
        id: 'trabajo',
        nombre: 'PC para Trabajar',
        tag: 'TRABAJO',
        subtitle:
          'Enfoque en productividad y multitarea: rendimiento consistente para laburo real.',
        highlights: [
          'Multitarea estable',
          'Setup productivo',
          'Pensada para jornada completa'
        ],
        specs: [
          { k: 'CPU', v: 'Gama media (equivalente) para trabajo sostenido' },
          { k: 'RAM', v: '16 GB recomendado' },
          { k: 'Almacenamiento', v: 'SSD amplio para proyectos y archivos' },
          { k: 'Enfoque', v: 'Productividad + estabilidad' }
        ],
        incluye: [
          'Armado y stress-test',
          'Instalación y configuración pro',
          'Drivers + performance base',
          'Migración/backup (opcional)'
        ],
        garantia: [
          'Garantía de armado y configuración',
          'Checklist + recomendaciones',
          'Soporte post-entrega (coordinado)'
        ]
      },
      {
        id: 'exigencia',
        nombre: 'PC para Exigencia',
        tag: 'PRO',
        subtitle:
          'Para trabajos más pesados: proyectos grandes, edición o tareas intensivas.',
        highlights: [
          'Rendimiento sostenido',
          'Preparada para cargas pesadas',
          'Escalable (upgrades)'
        ],
        specs: [
          { k: 'CPU', v: 'Gama alta (equivalente) según el caso de uso' },
          { k: 'RAM', v: '32 GB recomendado (según necesidad)' },
          { k: 'Almacenamiento', v: 'SSD/NVMe + espacio para datos' },
          { k: 'Enfoque', v: 'Potencia + estabilidad' }
        ],
        incluye: [
          'Armado premium + test extendido',
          'Configuración optimizada para el uso',
          'Drivers + ajustes avanzados',
          'Opcional: GPU según requerimiento'
        ],
        garantia: [
          'Garantía de armado y configuración',
          'Checklist + guía de cuidado',
          'Soporte post-entrega (coordinado)'
        ]
      }
    ];
  }, [perfilesProp]);

  const [activeId, setActiveId] = useState(perfiles[0]?.id || 'estudio');
  const active = perfiles.find((p) => p.id === activeId) || perfiles[0];

  const [open, setOpen] = useState(false);

  const pills = useMemo(
    () => [
      { k: 'Pedido guiado', v: 'simple y claro' },
      { k: 'Especificaciones', v: 'antes de confirmar' },
      { k: 'Zona', v: 'Córdoba Capital' }
    ],
    []
  );

  const handleOrder = (perfil) => {
    const msg =
      `Hola! Quiero pedir una ${perfil.nombre}.\n` +
      `Estoy en Córdoba Capital. Me mostrás especificaciones, servicios y garantía?\n` +
      `Gracias.`;

    if (whatsappUrl) {
      const link = buildWhatsAppLink(whatsappUrl, msg);
      window.open(link, '_blank', 'noopener,noreferrer');
      return;
    }
    // fallback a contacto
    scrollToHash(contactoHash);
  };

  // Background pattern (inline, portable)
  const circuitPattern = useMemo(() => {
    const svg = encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="rgba(222,174,97,0.18)"/>
            <stop offset="1" stop-color="rgba(157,112,63,0.11)"/>
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#g)" stroke-width="1.5" opacity="0.95">
          <path d="M18 54h78v42h60V72h66" />
          <path d="M18 186h96v-42h42v66h66" />
          <path d="M54 18v78h42v60h-24v66" />
          <path d="M198 18v96h-42v42h66" />
          <circle cx="96" cy="96" r="4.2" fill="rgba(222,174,97,0.26)" stroke="rgba(222,174,97,0.12)"/>
          <circle cx="156" cy="96" r="4.2" fill="rgba(157,112,63,0.22)" stroke="rgba(157,112,63,0.10)"/>
          <circle cx="120" cy="144" r="4.2" fill="rgba(245,214,187,0.18)" stroke="rgba(245,214,187,0.10)"/>
        </g>
      </svg>
    `);
    return `url("data:image/svg+xml;utf8,${svg}")`;
  }, []);

  return (
    <section
      id={id}
      className={cx(
        'relative isolate overflow-hidden',
        'bg-[color:var(--pc-bg)] text-[color:var(--pc-marfil)]'
      )}
    >
      {/* Background system */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.52]"
          style={{
            backgroundImage: circuitPattern,
            backgroundSize: '260px 260px',
            backgroundRepeat: 'repeat',
            transform: 'rotate(6deg) scale(1.04)',
            maskImage:
              'radial-gradient(70% 56% at 50% 36%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'radial-gradient(70% 56% at 50% 36%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)'
          }}
        />

        {/* auroras */}
        <div
          className="absolute -top-36 -left-44 size-[50rem] rounded-full blur-3xl opacity-70"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.20), rgba(157,112,63,0.10) 44%, rgba(0,0,0,0) 74%)'
          }}
        />
        <div
          className="absolute -bottom-48 -right-48 size-[54rem] rounded-full blur-3xl opacity-65"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(245,214,187,0.12), rgba(222,174,97,0.12) 45%, rgba(0,0,0,0) 76%)'
          }}
        />

        {/* vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 60% at 50% 35%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:py-16">
        <motion.div
          variants={V.section}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
                <span className="font-bignoodle tracking-[0.22em] text-[11px] uppercase crema">
                  servicios · presupuestos por perfil
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_12px_rgba(222,174,97,0.45)]" />
                <span className="text-[12px] text-white/70">
                  Córdoba Capital
                </span>
              </div>

              <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl leading-[1.06]">
                <span className="titulo block">
                  Elegí el perfil y pedí tu PC lista
                </span>
              </h2>

              <p className="cuerpo mt-3 text-white/75 text-[15px] sm:text-base leading-relaxed max-w-xl">
                Seleccioná una opción, revisá especificaciones, servicios y
                garantías, y realizá el pedido.
                <span className="ml-2 crema">
                  Solo pedidos dentro de Córdoba Capital.
                </span>
              </p>
            </div>

            {/* Pills */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full md:w-auto">
              {pills.map((p) => (
                <div
                  key={p.k}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-3"
                >
                  <div className="text-[10px] tracking-wide uppercase tracking-[0.20em] text-white/50">
                    {p.k}
                  </div>
                  <div
                    className="mt-1 text-[13px] font-semibold bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        'linear-gradient(90deg, rgba(255,246,238,0.95), rgba(222,174,97,0.92), rgba(157,112,63,0.90))'
                    }}
                  >
                    {p.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Segmented selector (desktop-friendly) */}
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-2">
            <div className="grid grid-cols-3 gap-2">
              {perfiles.map((p) => {
                const active = p.id === activeId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActiveId(p.id)}
                    className={cx(
                      'relative rounded-2xl px-4 py-3 text-left transition',
                      active
                        ? 'bg-black/25 border border-[rgba(222,174,97,0.22)]'
                        : 'hover:bg-white/5',
                      'focus:outline-none focus:ring-2 focus:ring-[rgba(222,174,97,0.35)]'
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-[0.20em] text-white/55">
                          {p.tag}
                        </div>
                        <div className="mt-1 text-sm sm:text-base font-semibold text-white/85 truncate">
                          {p.nombre}
                        </div>
                      </div>

                      <span
                        className={cx(
                          'shrink-0 h-2 w-2 rounded-full',
                          active ? 'bg-[color:var(--pc-oro)]' : 'bg-white/20'
                        )}
                        style={{
                          boxShadow: active
                            ? '0 0 16px rgba(222,174,97,0.45)'
                            : 'none'
                        }}
                      />
                    </div>

                    {active && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-2xl"
                        style={{
                          background:
                            'radial-gradient(120% 140% at 20% 10%, rgba(222,174,97,0.16), rgba(0,0,0,0) 55%)'
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main: cards + detail */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Cards grid */}
            <motion.div
              variants={V.grid}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-4"
            >
              {perfiles.map((p) => {
                const isActive = p.id === activeId;
                return (
                  <motion.div
                    key={p.id}
                    variants={V.card}
                    className={cx(
                      'relative rounded-[28px] border bg-white/5 backdrop-blur-xl overflow-hidden',
                      isActive
                        ? 'border-[rgba(222,174,97,0.22)]'
                        : 'border-white/10'
                    )}
                  >
                    {/* glow */}
                    <div
                      aria-hidden
                      className={cx(
                        'pointer-events-none absolute -inset-10 blur-3xl opacity-0 transition-opacity',
                        isActive ? 'opacity-60' : 'opacity-0'
                      )}
                      style={{
                        background:
                          'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.22), rgba(157,112,63,0.10) 42%, rgba(0,0,0,0) 74%)'
                      }}
                    />

                    <div className="relative p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[11px] uppercase tracking-[0.20em] text-white/55">
                            {p.tag}
                          </div>
                          <div className="mt-1 text-lg sm:text-xl font-semibold text-white/90 truncate">
                            {p.nombre}
                          </div>
                          <div className="mt-2 text-[13px] sm:text-[14px] text-white/70 leading-relaxed">
                            {p.subtitle}
                          </div>
                        </div>

                        <div className="shrink-0 flex flex-col items-end gap-2">
                          <span
                            className="rounded-full px-3 py-1 text-[11px] border bg-black/20"
                            style={{
                              borderColor: 'rgba(222,174,97,0.20)',
                              color: 'rgba(245,214,187,0.78)'
                            }}
                          >
                            Córdoba Capital
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveId(p.id);
                              setOpen(true);
                            }}
                            className="rounded-xl px-3 py-2 text-[12px] font-semibold border border-white/10 bg-white/5 hover:bg-white/8 transition"
                          >
                            Ver detalle
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.highlights.map((h) => (
                          <span
                            key={h}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1.5 text-[12px] text-white/75"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_10px_rgba(222,174,97,0.38)]" />
                            {h}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-col sm:flex-row gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveId(p.id);
                            setOpen(true);
                          }}
                          className={cx(
                            'inline-flex items-center justify-center rounded-2xl px-4 py-3',
                            'text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/8 transition'
                          )}
                        >
                          Especificaciones + garantías
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOrder(p)}
                          className={cx(
                            'group relative inline-flex items-center justify-center rounded-2xl px-4 py-3',
                            'text-sm font-semibold text-[color:var(--pc-bg)]',
                            'ring-1 ring-[rgba(222,174,97,0.32)]',
                            'shadow-[0_18px_50px_rgba(0,0,0,0.40)]',
                            'hover:-translate-y-[1px] active:translate-y-0 transition-transform'
                          )}
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(222,174,97,0.98), rgba(157,112,63,0.95))'
                          }}
                        >
                          <span className="relative z-10">Pedir esta PC</span>
                          <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                          >
                            <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-[rgba(255,246,238,0.35)] opacity-0 blur-md skew-x-[-12deg] group-hover:opacity-60 animate-[ray_1.2s_ease-out_infinite]" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Detail panel (desktop) */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <div className="relative rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full blur-3xl opacity-35"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.26), rgba(0,0,0,0) 70%)'
                    }}
                  />

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                          detalle del perfil
                        </div>
                        <div className="mt-1 text-xl font-semibold text-white/90 truncate">
                          {active?.nombre}
                        </div>
                        <div className="mt-2 text-[13px] text-white/70 leading-relaxed">
                          {active?.subtitle}
                        </div>
                      </div>

                      <span
                        className="shrink-0 rounded-full px-3 py-1 text-[11px] border bg-black/20"
                        style={{
                          borderColor: 'rgba(222,174,97,0.20)',
                          color: 'rgba(245,214,187,0.78)'
                        }}
                      >
                        {active?.tag}
                      </span>
                    </div>

                    {/* Specs */}
                    <div className="mt-5">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                        especificaciones (referenciales)
                      </div>
                      <div className="mt-3 grid gap-2">
                        {active?.specs?.map((s) => (
                          <div
                            key={s.k}
                            className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-black/15 px-4 py-3"
                          >
                            <div className="text-[12px] text-white/60 uppercase tracking-[0.18em]">
                              {s.k}
                            </div>
                            <div className="text-[13px] text-white/80 text-right">
                              {s.v}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Incluye + Garantía */}
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                          incluye
                        </div>
                        <ul className="mt-3 space-y-2 text-[13px] text-white/75">
                          {active?.incluye?.map((x) => (
                            <li key={x} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_10px_rgba(222,174,97,0.35)]" />
                              <span className="leading-relaxed">{x}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                          garantías
                        </div>
                        <ul className="mt-3 space-y-2 text-[13px] text-white/75">
                          {active?.garantia?.map((x) => (
                            <li key={x} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_10px_rgba(222,174,97,0.35)]" />
                              <span className="leading-relaxed">{x}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleOrder(active)}
                        className={cx(
                          'group relative inline-flex flex-1 items-center justify-center rounded-2xl px-4 py-3',
                          'text-sm font-semibold text-[color:var(--pc-bg)]',
                          'ring-1 ring-[rgba(222,174,97,0.32)]',
                          'shadow-[0_18px_50px_rgba(0,0,0,0.40)]',
                          'hover:-translate-y-[1px] active:translate-y-0 transition-transform'
                        )}
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(222,174,97,0.98), rgba(157,112,63,0.95))'
                        }}
                      >
                        <span className="relative z-10">Pedir este perfil</span>
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                        >
                          <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-[rgba(255,246,238,0.35)] opacity-0 blur-md skew-x-[-12deg] group-hover:opacity-60 animate-[ray_1.2s_ease-out_infinite]" />
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => scrollToHash(contactoHash)}
                        className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/8 transition"
                      >
                        Consultar
                      </button>
                    </div>

                    <div className="mt-4 text-[12px] text-white/55">
                      Nota: las especificaciones pueden ajustarse según
                      disponibilidad y tu necesidad real.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal (mobile + "Ver detalle") */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={[
              'fixed inset-0 z-[80] ',
              // Mobile: bottom-sheet | Desktop: center modal
              'flex items-end sm:items-center justify-center',
              // Safe paddings
              'px-3 sm:px-6',
              'pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-6',
              'pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-6'
            ].join(' ')}
            variants={V.modalBackdrop}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

            <motion.div
              className={[
                'relative w-full max-w-2xl',
                // Altura responsiva:
                // - Mobile: casi full pero respetando padding y safe-area
                // - Desktop: auto (sin forzar)
                'max-h-[calc(100dvh-1.5rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))]',
                'sm:max-h-[min(82vh,900px)]',
                // Estilo
                'rounded-t-[28px] sm:rounded-[28px]',
                'border border-white/10',
                'bg-[color:var(--pc-bg)]/82 backdrop-blur-xl',
                'shadow-[0_40px_120px_rgba(0,0,0,0.65)]',
                'overflow-hidden'
              ].join(' ')}
              variants={V.modalPanel}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Estructura: header fijo + body scroll + footer fijo */}
              <div className="flex flex-col h-full">
                {/* Header sticky */}
                <div className="sticky top-0 z-10 border-b border-white/10 bg-[color:var(--pc-bg)]/70 backdrop-blur-xl">
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                          detalle
                        </div>

                        <div className="mt-1 titulo uppercase text-lg sm:text-2xl font-semibold text-white/90 truncate">
                          {active?.nombre}
                        </div>

                        <div className="mt-2 text-[13px] sm:text-[14px] text-white/70 leading-relaxed">
                          {active?.subtitle}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="shrink-0 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 px-3 py-2 text-sm font-semibold transition"
                        aria-label="Cerrar"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Body scroll */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 sm:p-6">
                    <div className="grid gap-4">
                      <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                          especificaciones (referenciales)
                        </div>

                        <div className="mt-3 grid gap-2">
                          {active?.specs?.map((s) => (
                            <div
                              key={s.k}
                              className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-4 rounded-2xl border border-white/10 bg-black/10 px-4 py-3"
                            >
                              <div className="text-[12px] text-white/60 uppercase tracking-[0.18em]">
                                {s.k}
                              </div>
                              <div className="text-[13px] text-white/80 sm:text-right">
                                {s.v}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                          <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                            incluye
                          </div>
                          <ul className="mt-3 space-y-2 text-[13px] text-white/75">
                            {active?.incluye?.map((x) => (
                              <li key={x} className="flex gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_10px_rgba(222,174,97,0.35)]" />
                                <span className="leading-relaxed">{x}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                          <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                            garantías
                          </div>
                          <ul className="mt-3 space-y-2 text-[13px] text-white/75">
                            {active?.garantia?.map((x) => (
                              <li key={x} className="flex gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_10px_rgba(222,174,97,0.35)]" />
                                <span className="leading-relaxed">{x}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                          condición comercial
                        </div>
                        <div className="mt-2 text-[13px] text-white/75 leading-relaxed">
                          Pedidos dentro de{' '}
                          <span className="crema font-semibold">
                            Córdoba Capital
                          </span>
                          . Si estás en otra zona, consultanos y te indicamos
                          alternativas.
                        </div>
                      </div>

                      <div className="text-[12px] text-white/55">
                        Nota: las especificaciones pueden ajustarse según
                        disponibilidad y tu necesidad real.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer sticky (CTA) */}
                <div className="sticky bottom-0 z-10 border-t border-white/10 bg-[color:var(--pc-bg)]/70 backdrop-blur-xl">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        onClick={() => handleOrder(active)}
                        className={cx(
                          'group relative inline-flex flex-1 items-center justify-center rounded-2xl px-4 py-3',
                          'text-sm font-semibold text-[color:var(--pc-bg)]',
                          'ring-1 ring-[rgba(222,174,97,0.32)]',
                          'shadow-[0_18px_50px_rgba(0,0,0,0.40)]',
                          'hover:-translate-y-[1px] active:translate-y-0 transition-transform'
                        )}
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(222,174,97,0.98), rgba(157,112,63,0.95))'
                        }}
                      >
                        <span className="relative z-10">Pedir este perfil</span>
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                        >
                          <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-[rgba(255,246,238,0.35)] opacity-0 blur-md skew-x-[-12deg] group-hover:opacity-60 animate-[ray_1.2s_ease-out_infinite]" />
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          scrollToHash(contactoHash);
                        }}
                        className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/8 transition"
                      >
                        Consultar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Local keyframes (usa tu @keyframes ray ya definido globalmente, pero dejamos fallback por seguridad) */}
      <style>{`
        @keyframes ray {
          0%   { transform: translateX(-40%) skewX(-12deg); opacity: 0; }
          15%  { opacity: .85; }
          100% { transform: translateX(40%)  skewX(-12deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
