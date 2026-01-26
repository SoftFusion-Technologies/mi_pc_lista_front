import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from 'react-icons/fa';

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

const Footer = ({
  whatsappUrl = '', // ej: "https://wa.me/5495493517612425"
  instagramUrl = '#',
  facebookUrl = '#',
  tiktokUrl = '#',
  zona = 'Córdoba Capital',
  email = 'hola@mipclista.com'
}) => {
  const year = new Date().getFullYear();

  const socialLinks = useMemo(
    () => [
      { icon: <FaInstagram />, href: instagramUrl, name: 'Instagram' },
      { icon: <FaFacebookF />, href: facebookUrl, name: 'Facebook' },
      { icon: <FaTiktok />, href: tiktokUrl, name: 'TikTok' },
      { icon: <FaWhatsapp />, href: whatsappUrl || '#', name: 'WhatsApp' }
    ],
    [instagramUrl, facebookUrl, tiktokUrl, whatsappUrl]
  );

  const nav = useMemo(
    () => [
      {
        title: 'Sitio',
        links: [
          { name: 'Inicio', to: '/' },
          { name: 'Servicios', to: '/#servicios' },
          { name: 'Perfiles (Estudio/Trabajo/Pro)', to: '/#servicios' },
          { name: 'Método de trabajo', to: '/#metodo' },
          { name: 'Contacto', to: '/#contacto' }
        ]
      },
      {
        title: 'Ayuda',
        links: [
          { name: 'Preguntas frecuentes', to: '/#faq' },
          { name: 'Garantías', to: '/#garantias' },
          { name: `Zona de pedidos: ${zona}`, to: '/#zona' }
        ]
      },
      {
        title: 'Legal',
        links: [
          { name: 'Política de Privacidad', to: '/privacy' },
          { name: 'Términos de Uso', to: '/terms' }
        ]
      }
    ],
    [zona]
  );

  const pilares = useMemo(
    () => [
      {
        k: 'Rendimiento',
        tag: 'TUNE',
        d: 'Arranque, limpieza, drivers y ajustes finos.'
      },
      {
        k: 'Estabilidad',
        tag: 'FIX',
        d: 'Diagnóstico real: temperaturas y causa raíz.'
      },
      {
        k: 'Seguridad',
        tag: 'SAFE',
        d: 'Backup, hardening y buenas prácticas.'
      },
      {
        k: 'Transparencia',
        tag: 'CLEAR',
        d: 'Checklist final: qué se hizo y qué mejoró.'
      }
    ],
    []
  );

  const wspText =
    'Hola! Quiero pedir una PC lista para usar. Estoy en Córdoba Capital. Me asesorás con los perfiles y componentes?';

  const wspLink = whatsappUrl ? buildWhatsAppLink(whatsappUrl, wspText) : '';

  return (
    <footer className="relative isolate overflow-hidden bg-[color:var(--pc-bg)] text-[color:var(--pc-marfil)]">
      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Background system */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 -left-52 size-[54rem] rounded-full blur-3xl opacity-70"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.22), rgba(157,112,63,0.12) 45%, rgba(0,0,0,0) 76%)'
          }}
        />
        <div
          className="absolute -bottom-52 -right-60 size-[58rem] rounded-full blur-3xl opacity-65"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(245,214,187,0.12), rgba(222,174,97,0.12) 45%, rgba(0,0,0,0) 78%)'
          }}
        />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.20]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage:
              'radial-gradient(70% 60% at 50% 20%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'radial-gradient(70% 60% at 50% 20%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 100%)'
          }}
        />

        {/* vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 60% at 50% 20%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.60) 100%)'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 sm:py-16">
        {/* Upper: brand + CTA row */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Brand block */}
          <div className="space-y-5">
            <NavLink to="/" className="inline-flex items-center gap-3">
              <span className="font-bignoodle text-[22px] sm:text-[26px] tracking-[0.22em] uppercase crema">
                mi pc lista
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_14px_rgba(222,174,97,0.45)]" />

              <span className="text-[12px] uppercase tracking-[0.22em] text-white/60">
                Córdoba Capital
              </span>
            </NavLink>

            <p className="cuerpo text-white/75 leading-relaxed max-w-xl">
              Presupuestamos, armamos y configuramos PCs para estudiar, trabajar
              y tareas exigentes. Te la entregamos lista para usar: seguridad,
              confianza y un método claro.
              <span className="ml-2 crema font-semibold">
                Pedidos en {zona}.
              </span>
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={
                    social.href?.startsWith('http') ? '_blank' : undefined
                  }
                  rel={
                    social.href?.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white/70 hover:text-white transition"
                  aria-label={social.name}
                >
                  {React.cloneElement(social.icon, {
                    size: 18,
                    className:
                      'transition-transform duration-200 group-hover:scale-110'
                  })}
                </a>
              ))}
            </div>

            <div className="text-[12px] text-white/55">
              Contacto:{' '}
              <a
                href={`mailto:${email}`}
                className="text-white/75 hover:text-white transition underline underline-offset-4 decoration-white/15 hover:decoration-white/35"
              >
                {email}
              </a>
            </div>
          </div>

          {/* CTA + pillars */}
          <div className="space-y-4">
            {/* CTA card */}
            <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 shadow-[0_30px_90px_rgba(0,0,0,0.55)] overflow-hidden relative">
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
                  acción rápida
                </div>
                <div className="mt-1 text-lg font-semibold text-white/90">
                  ¿Listo para tu presupuesto?
                </div>
                <p className="mt-2 text-[13px] text-white/70 leading-relaxed">
                  Elegí perfil, confirmá especificaciones y realizá el pedido
                  con asesoramiento.
                </p>

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <a
                    href="/#servicios"
                    className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/8 transition"
                  >
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
                    <span className="relative z-10">WhatsApp directo</span>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                    >
                      <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-[rgba(255,246,238,0.35)] opacity-0 blur-md skew-x-[-12deg] group-hover:opacity-60 animate-[ray_1.2s_ease-out_infinite]" />
                    </span>
                  </a>
                </div>

                <div className="mt-3 text-[12px] text-white/55">
                  {zona} · Optimización · Reparación · Seguridad
                </div>
              </div>
            </div>

            {/* Pillars mini grid */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pilares.map((p) => (
                <motion.div
                  key={p.k}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[12px] font-semibold text-white/85">
                      {p.k}
                    </div>
                  </div>
                  <div className="mt-2 text-[12.5px] text-white/65 leading-relaxed">
                    {p.d}
                  </div>
                </motion.div>
              ))}
            </div> */}
          </div>
        </div>

        {/* Links row */}
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {nav.map((section) => (
            <div key={section.title} className="space-y-3">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                {section.title}
              </div>

              <ul className="space-y-2">
                {section.links.map((l) => (
                  <li key={l.name}>
                    {/* Hash links: usamos <a> para anchors, y <NavLink> para rutas */}
                    {String(l.to).includes('/#') ? (
                      <a
                        href={l.to}
                        className="text-[14px] text-white/70 hover:text-white transition underline-offset-4 hover:underline decoration-white/15 hover:decoration-white/35"
                      >
                        {l.name}
                      </a>
                    ) : (
                      <NavLink
                        to={l.to}
                        className="text-[14px] text-white/70 hover:text-white transition underline-offset-4 hover:underline decoration-white/15 hover:decoration-white/35"
                      >
                        {l.name}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <div className="text-[13px] text-white/60">
            © {year} <span className="crema font-semibold">mi pc lista</span>.
            Todos los derechos reservados.
          </div>

          <div className="mt-2 text-[12px] text-white/50">
            Página creada y mantenida por{' '}
            <a
              href="https://softfusion.com.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/75 hover:text-white transition underline underline-offset-4 decoration-white/15 hover:decoration-white/35"
            >
              SoftFusion
            </a>
            .
          </div>
        </div>
      </div>

      {/* Fallback local keyframes (ya tenés ray global, pero dejamos respaldo) */}
      <style>{`
        @keyframes ray {
          0%   { transform: translateX(-40%) skewX(-12deg); opacity: 0; }
          15%  { opacity: .85; }
          100% { transform: translateX(40%)  skewX(-12deg); opacity: 0; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
