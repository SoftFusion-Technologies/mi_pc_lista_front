import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from '../img/Logo.webp';

const WHATSAPP_NUMBER_WA = '5493517612425';
const WHATSAPP_DISPLAY = '0351 761 2425';
const INSTAGRAM_URL = 'https://www.instagram.com/pc_lista/';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const NAV_ITEMS = useMemo(
    () => [
      { name: 'PC ESTUDIO', path: '/pc-estudio' },
      { name: 'PC TRABAJO', path: '/pc-trabajo' },
      { name: 'PC PRO', path: '/pc-pro' },
      { name: 'CÓMO PEDIR', path: '/como-pedir' },
      { name: 'GARANTÍA', path: '/garantia' },
      { name: 'CONTACTO', path: '/contacto' }
    ],
    []
  );

  const whatsappHref = useMemo(() => {
    const text = encodeURIComponent(
      'Hola! Quiero presupuesto para una PC EN MARCHA para usar. ¿Me asesorás según lo que necesito (estudio/trabajo/pro)?'
    );
    return `https://wa.me/${WHATSAPP_NUMBER_WA}?text=${text}`;
  }, []);

  // Cerrar drawer al navegar
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll cuando abre el menú mobile
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

const shell =
  'fixed top-0 left-0 w-full z-50 border-b transition-[background,box-shadow,border-color,transform] duration-300';

const shellSkin =
  scrolled || open
    ? 'bg-[color:var(--pc-bg)]/88 supports-[backdrop-filter]:bg-[color:var(--pc-bg)]/72 backdrop-blur-xl border-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.45)]'
    : 'bg-[color:var(--pc-bg)]/72 supports-[backdrop-filter]:bg-[color:var(--pc-bg)]/86 backdrop-blur-xl border-white/10 shadow-[0_14px_40px_rgba(0,0,0,0.22)]';

  const headerH = scrolled ? 'h-[68px] md:h-[76px]' : 'h-[74px] md:h-[86px]';

  const textPrimary = 'text-[color:var(--pc-marfil)]';
  const textMuted = 'text-white/65';

  const linkBase =
    'uppercase font-semibold tracking-[0.16em] text-[11px] 2xl:text-xs transition';

  const iconBtn =
    'grid place-items-center rounded-xl ring-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pc-oro)]/55';

  const iconBtnSkin =
    scrolled || open
      ? 'bg-white/5 ring-white/10 hover:bg-white/10'
      : 'bg-white/5 ring-white/10 hover:bg-white/10';

  const onToggle = () => setOpen((v) => !v);

  return (
    <>
      <nav
        className={`${shell} ${shellSkin} ${headerH}`}
        role="navigation"
        aria-label="Principal"
      >
        <div className="mx-auto max-w-[1560px] h-full px-4 sm:px-6 xl:px-10">
          {/* Barra principal: flex estable => sin desalineos */}
          <div className="h-full flex items-center gap-4">
            {/* BRAND */}
            <NavLink
              to="/"
              className="flex items-center gap-3 min-w-0 shrink-0"
            >
              <div
                className={[
                  'relative overflow-hidden rounded-2xl ring-1',
                  scrolled
                    ? 'h-9 w-9 md:h-10 md:w-10'
                    : 'h-10 w-10 md:h-11 md:w-11',
                  'bg-white/5 ring-white/10',
                  'transition-all duration-300'
                ].join(' ')}
              >
                <img
                  src={Logo}
                  alt="PC EN MARCHA"
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute inset-0 ring-1 ring-[color:var(--pc-oro)]/15" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={[
                      'titulo uppercase font-extrabold truncate leading-none',
                      scrolled
                        ? 'text-[18px] md:text-[20px]'
                        : 'text-[20px] md:text-[22px]',
                      textPrimary
                    ].join(' ')}
                  >
                    PC EN MARCHA
                  </span>

                  <span
                    className="hidden md:inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold bg-white/5 ring-1 ring-white/10 text-white/80"
                    title="Solo pedidos dentro de Córdoba Capital"
                  >
                    <FaMapMarkerAlt className="opacity-90" />
                    Córdoba Capital
                  </span>
                </div>
              </div>
            </NavLink>

            {/* NAV DESKTOP (centrado real) */}
            <div className="hidden xl:flex flex-1 justify-center">
              <div className="relative">
                <ul className="flex items-center gap-6 2xl:gap-8 rounded-full px-6 py-2.5 bg-white/5 ring-1 ring-white/10 shadow-[0_12px_34px_rgba(0,0,0,0.28)]">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.name} className="relative">
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          [
                            linkBase,
                            'px-1 py-2 inline-flex items-center',
                            isActive
                              ? 'text-[color:var(--pc-oro)]'
                              : 'text-white/85 hover:text-white'
                          ].join(' ')
                        }
                      >
                        {item.name}
                      </NavLink>

                      {/* underline suave + activo */}
                      <span className="pointer-events-none absolute left-1 right-1 -bottom-[2px] h-[2px] rounded-full bg-white/10" />
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          [
                            'pointer-events-none absolute left-1 right-1 -bottom-[2px] h-[2px] rounded-full',
                            'transition-transform duration-200 origin-left',
                            isActive
                              ? 'scale-x-100 bg-[color:var(--pc-oro)]'
                              : 'scale-x-0 bg-[color:var(--pc-oro)]'
                          ].join(' ')
                        }
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                    </li>
                  ))}
                </ul>

                {/* línea de “halo” inferior, mejora visual sin dorado pesado */}
                <div className="pointer-events-none absolute inset-x-8 -bottom-4 h-6 blur-2xl bg-[color:var(--pc-oro)]/10" />
              </div>
            </div>

            {/* ACCIONES DESKTOP */}
            <div className="hidden xl:flex items-center gap-3 shrink-0">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${iconBtn} ${iconBtnSkin} h-10 w-10`}
                aria-label="Instagram"
                title="Instagram"
              >
                <FaInstagram className="text-white/85" size={18} />
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group relative overflow-hidden rounded-2xl
                  px-4 py-2.5
                  font-extrabold text-[12px] tracking-[0.14em] uppercase
                  text-[color:var(--pc-bg)]
                  bg-gradient-to-r from-[color:var(--pc-oro)] to-[color:var(--pc-oro-oscuro)]
                  shadow-[0_16px_40px_rgba(0,0,0,0.35)]
                  hover:brightness-110 hover:-translate-y-[1px] active:translate-y-0 transition
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pc-oro)]/55
                "
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <FaWhatsapp />
                  TE AYUDAMOS A ELEGIR BIEN
                </span>
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </a>

              <span
                className="hidden 2xl:inline-flex rounded-2xl px-4 py-2.5 text-xs font-semibold ring-1 bg-white/5 ring-white/10 text-white/80"
                title="Teléfono"
              >
                {WHATSAPP_DISPLAY}
              </span>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={onToggle}
              className={`${iconBtn} ${iconBtnSkin} xl:hidden h-10 w-10 ml-auto`}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? (
                <AiOutlineClose size={22} className="text-white/90" />
              ) : (
                <AiOutlineMenu size={22} className="text-white/90" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY + DRAWER */}
      <div
        id="mobile-nav"
        className={[
          'xl:hidden fixed inset-0 z-[60]',
          'transition-opacity duration-300',
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        ].join(' ')}
        aria-hidden={!open}
      >
        {/* Overlay */}
        <button
          className={[
            'absolute inset-0 w-full h-full',
            'bg-black/55 backdrop-blur-[2px]',
            'transition-opacity duration-300'
          ].join(' ')}
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
        />

        {/* Drawer */}
        <aside
          className={[
            'absolute right-0 top-0 h-full w-[92%] max-w-[420px]',
            'bg-[color:var(--pc-bg)]/96 supports-[backdrop-filter]:bg-[color:var(--pc-bg)]/82 backdrop-blur-xl',
            'border-l border-white/10 shadow-[-18px_0_55px_rgba(0,0,0,0.55)]',
            'transition-transform duration-300',
            open ? 'translate-x-0' : 'translate-x-full'
          ].join(' ')}
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
        >
          {/* Header drawer */}
          <div className="flex items-center justify-between px-6 pt-6">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
                <img
                  src={Logo}
                  alt="PC EN MARCHA"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="text-lg font-extrabold text-white leading-none">
                  PC EN MARCHA
                </div>
                <div className="text-xs text-white/65 mt-1">
                  Solo pedidos Córdoba Capital
                </div>
              </div>
            </NavLink>

            <button
              onClick={() => setOpen(false)}
              className={`${iconBtn} ${iconBtnSkin} h-10 w-10`}
              aria-label="Cerrar menú"
            >
              <AiOutlineClose size={22} className="text-white/90" />
            </button>
          </div>

          {/* Cards principales (las 3 PCs) */}
          <div className="px-6 mt-6 grid grid-cols-1 gap-3">
            {[
              {
                title: 'PC Estudio',
                desc: 'Office, clases, navegación, tareas',
                to: '/pc-estudio'
              },
              {
                title: 'PC Trabajo',
                desc: 'Productividad, multitarea, estabilidad',
                to: '/pc-trabajo'
              },
              {
                title: 'PC Pro',
                desc: 'Edición, render, cargas pesadas',
                to: '/pc-pro'
              }
            ].map((c) => (
              <NavLink
                key={c.title}
                to={c.to}
                className="
                  group rounded-2xl p-4
                  bg-white/5 ring-1 ring-white/10
                  hover:bg-white/10 hover:ring-[color:var(--pc-oro)]/25
                  transition
                "
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold tracking-[0.16em] text-white uppercase">
                      {c.title}
                    </div>
                    <div className="text-xs text-white/65 mt-1">{c.desc}</div>
                  </div>
                  <div className="mt-0.5 text-[color:var(--pc-oro)] opacity-80 group-hover:opacity-100 transition">
                    →
                  </div>
                </div>
              </NavLink>
            ))}
          </div>

          {/* Links secundarios (reusa NAV_ITEMS sin duplicar lógica) */}
          <div className="px-6 mt-6">
            <div className="text-[10px] tracking-[0.2em] uppercase text-white/45 mb-2">
              Información
            </div>

            <ul className="rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
              {NAV_ITEMS.filter(
                (i) =>
                  !['/pc-estudio', '/pc-trabajo', '/pc-pro'].includes(i.path)
              ).map((item) => (
                <li
                  key={item.name}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      [
                        'block px-4 py-4',
                        'text-sm font-semibold tracking-[0.16em] uppercase',
                        isActive
                          ? 'text-[color:var(--pc-oro)]'
                          : 'text-white/85 hover:text-white'
                      ].join(' ')
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA + Social */}
          <div className="px-6 mt-6 pb-8 flex flex-col gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-2xl px-4 py-3
                font-extrabold uppercase tracking-[0.14em] text-[13px]
                text-[color:var(--pc-bg)]
                bg-gradient-to-r from-[color:var(--pc-oro)] to-[color:var(--pc-oro-oscuro)]
                shadow-[0_18px_45px_rgba(0,0,0,0.45)]
                active:scale-[0.99] transition
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pc-oro)]/55
              "
            >
              <span className="inline-flex items-center justify-center gap-2 w-full">
                <FaWhatsapp />
                Consultar por WhatsApp
              </span>
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl px-4 py-3 bg-white/5 ring-1 ring-white/10 text-white/85 hover:bg-white/10 transition"
              >
                <span className="inline-flex items-center justify-center gap-2 w-full font-semibold">
                  <FaInstagram />
                  Instagram
                </span>
              </a>

              <a
                href={`tel:${WHATSAPP_DISPLAY.replace(/\s/g, '')}`}
                className="rounded-2xl px-4 py-3 bg-white/5 ring-1 ring-white/10 text-white/85 hover:bg-white/10 transition"
              >
                <span className="inline-flex items-center justify-center w-full font-semibold">
                  {WHATSAPP_DISPLAY}
                </span>
              </a>
            </div>

            <p className="text-center text-xs text-white/55 mt-2">
              Pedidos únicamente dentro de Córdoba Capital.
            </p>
          </div>
        </aside>
      </div>

      {/* Spacer para que el contenido no quede debajo del navbar */}
      <div
        className={scrolled ? 'h-[68px] md:h-[76px]' : 'h-[74px] md:h-[86px]'}
      />
    </>
  );
};

export default Navbar;
