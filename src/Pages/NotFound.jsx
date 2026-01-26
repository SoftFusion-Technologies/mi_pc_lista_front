import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft, FaWhatsapp, FaTools } from 'react-icons/fa';

const cx = (...c) => c.filter(Boolean).join(' ');

function buildWhatsAppLink(baseUrl, message) {
  if (!baseUrl) return '';
  const hasQuery = baseUrl.includes('?');
  const sep = hasQuery ? '&' : '?';
  if (baseUrl.includes('text=')) {
    return `${baseUrl}%0A%0A${encodeURIComponent(message)}`;
  }
  return `${baseUrl}${sep}text=${encodeURIComponent(message)}`;
}

export default function NotFound({
  whatsappUrl = '',
  zona = 'Córdoba Capital'
}) {
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

  const wspText =
    'Hola! Entré a un link que no existe. Me ayudás a encontrar el perfil de PC ideal para mí?';

  const wspLink = whatsappUrl ? buildWhatsAppLink(whatsappUrl, wspText) : '';

  return (
    <main className="relative isolate min-h-[calc(100dvh-64px)] overflow-hidden bg-[color:var(--pc-bg)] text-[color:var(--pc-marfil)]">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage: circuitPattern,
            backgroundSize: '260px 260px',
            backgroundRepeat: 'repeat',
            transform: 'rotate(6deg) scale(1.04)',
            maskImage:
              'radial-gradient(70% 56% at 50% 36%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'radial-gradient(70% 56% at 50% 36%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
          }}
        />

        <div
          className="absolute -top-44 -left-52 size-[56rem] rounded-full blur-3xl opacity-70"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.22), rgba(157,112,63,0.12) 44%, rgba(0,0,0,0) 76%)'
          }}
        />
        <div
          className="absolute -bottom-52 -right-60 size-[60rem] rounded-full blur-3xl opacity-65"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(245,214,187,0.12), rgba(222,174,97,0.12) 45%, rgba(0,0,0,0) 78%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 60% at 50% 35%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.62) 100%)'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
        >
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              <span className="font-bignoodle tracking-[0.22em] text-[11px] uppercase crema">
                mi pc lista · soporte premium
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_12px_rgba(222,174,97,0.45)]" />
              <span className="text-[12px] text-white/70">Error 404</span>
            </div>

            <div className="mt-6">
              <div
                className="font-bignoodle text-[80px] sm:text-[110px] leading-none tracking-[0.12em] text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, rgba(255,246,238,0.92), rgba(222,174,97,0.92), rgba(157,112,63,0.88))'
                }}
              >
                404
              </div>

              <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl leading-[1.06]">
                <span className="titulo block">Página no encontrada</span>
              </h1>

              <p className="cuerpo mt-3 text-white/75 text-[15px] sm:text-base leading-relaxed max-w-xl">
                El link al que entraste no existe o fue movido. Si querés, te
                llevamos directo a los perfiles de PC y al pedido guiado.
                <span className="ml-2 crema font-semibold">
                  Pedidos en {zona}.
                </span>
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <NavLink
                  to="/"
                  className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/8 transition"
                >
                  <FaHome className="mr-2" />
                  Ir al inicio
                </NavLink>

                <a
                  href="/#servicios"
                  className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/8 transition"
                >
                  <FaTools className="mr-2" />
                  Ver perfiles
                </a>

                <a
                  href={wspLink || '/#contacto'}
                  target={wspLink ? '_blank' : undefined}
                  rel={wspLink ? 'noopener noreferrer' : undefined}
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
                  <FaWhatsapp className="mr-2" />
                  <span className="relative z-10">WhatsApp</span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                  >
                    <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-[rgba(255,246,238,0.35)] opacity-0 blur-md skew-x-[-12deg] group-hover:opacity-60 animate-[ray_1.2s_ease-out_infinite]" />
                  </span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="mt-4 inline-flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition"
              >
                <FaArrowLeft />
                Volver a la página anterior
              </button>
            </div>
          </div>

          {/* Right: card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
            className="relative rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 shadow-[0_30px_90px_rgba(0,0,0,0.55)] overflow-hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-20 size-64 rounded-full blur-3xl opacity-35"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.26), rgba(0,0,0,0) 70%)'
              }}
            />

            <div className="relative">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                acceso rápido
              </div>

              <div className="mt-2 text-lg font-semibold text-white/90">
                Atajos útiles
              </div>

              <div className="mt-4 grid gap-3">
                {[
                  {
                    t: 'Perfiles de PC',
                    d: 'Estudio · Trabajo · Pro',
                    href: '/#servicios'
                  },
                  {
                    t: 'Método de trabajo',
                    d: 'Checklist y entrega clara',
                    href: '/#metodo'
                  },
                  {
                    t: 'Contacto',
                    d: 'Consultá y coordinamos',
                    href: '/#contacto'
                  }
                ].map((x) => (
                  <a
                    key={x.t}
                    href={x.href}
                    className="rounded-2xl border border-white/10 bg-black/10 hover:bg-white/5 transition px-4 py-3"
                  >
                    <div className="text-[13px] font-semibold text-white/85">
                      {x.t}
                    </div>
                    <div className="mt-1 text-[12px] text-white/60">{x.d}</div>
                  </a>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-4">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                  nota
                </div>
                <div className="mt-2 text-[13px] text-white/70 leading-relaxed">
                  Si llegaste acá por un link antiguo, escribinos y te guiamos
                  al perfil correcto.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Fallback local keyframes */}
      <style>{`
        @keyframes ray {
          0%   { transform: translateX(-40%) skewX(-12deg); opacity: 0; }
          15%  { opacity: .85; }
          100% { transform: translateX(40%)  skewX(-12deg); opacity: 0; }
        }
      `}</style>
    </main>
  );
}
