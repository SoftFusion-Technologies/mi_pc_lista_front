// src/Components/ScrollToTop.jsx
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop animado (premium):
 * - Anima el scroll con requestAnimationFrame y easing
 * - Overlay visual opcional durante el scroll
 * - Excluye rutas por prefijo
 * - Respeta prefers-reduced-motion
 */
export default function ScrollToTop({
  top = 0,
  // Mantengo compatibilidad con tu prop; si pasás 'auto' y animate=true, se usa animación custom.
  behavior = 'auto',
  exclude = [],

  // NUEVO
  animate = true,
  durationMs = 520, // 420–650 suele verse bien
  easing = 'easeOutCubic', // 'easeOutCubic' | 'easeInOutQuint' | 'easeOutExpo'
  showOverlay = true,
  overlayVariant = 'soft' // 'soft' | 'none'
}) {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const rafRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Easing helpers
  const EASING = {
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeInOutQuint: (t) =>
      t < 0.5 ? 16 * Math.pow(t, 5) : 1 - Math.pow(-2 * t + 2, 5) / 2,
    easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
  };

  const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  };

  const cancel = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setIsScrolling(false);
  };

  const animatedScrollTo = (targetTop) => {
    cancel();

    const startY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0;

    // Si ya estamos cerca, no animar
    if (Math.abs(startY - targetTop) < 4) {
      window.scrollTo({ top: targetTop, behavior: 'auto' });
      return;
    }

    const start = performance.now();
    const dur = Math.max(180, Number(durationMs) || 520);
    const ease = EASING[easing] || EASING.easeOutCubic;

    setIsScrolling(true);

    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const y = Math.round(startY + (targetTop - startY) * ease(t));
      window.scrollTo(0, y);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
        setIsScrolling(false);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const nextPath = location.pathname;

    // Si no cambió el pathname, no scrollear
    if (prevPath === nextPath) return;

    // Excluir rutas por prefijo
    if (exclude.some((p) => nextPath.startsWith(p))) {
      prevPathRef.current = nextPath;
      return;
    }

    // Si el usuario prefiere menos movimiento, scroll directo
    if (prefersReducedMotion() || !animate) {
      window.scrollTo({
        top,
        behavior: behavior === 'smooth' ? 'smooth' : 'auto'
      });
      prevPathRef.current = nextPath;
      return;
    }

    // Si el dev pide behavior smooth explícito, lo dejamos.
    // Si behavior es auto, usamos animación custom premium.
    if (behavior === 'smooth') {
      setIsScrolling(showOverlay);
      window.scrollTo({ top, behavior: 'smooth' });
      // Apagar overlay luego de una ventana razonable
      const t = setTimeout(
        () => setIsScrolling(false),
        Math.max(240, durationMs)
      );
      prevPathRef.current = nextPath;
      return () => clearTimeout(t);
    }

    animatedScrollTo(top);
    prevPathRef.current = nextPath;

    // Cleanup
    return () => cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Overlay visual sutil (no bloquea clicks)
  if (!showOverlay || overlayVariant === 'none') return null;

  return (
    <div
      aria-hidden
      className={[
        'pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300',
        isScrolling ? 'opacity-100' : 'opacity-0'
      ].join(' ')}
    >
      {/* Variante "soft": leve blur + viñeta, queda premium */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          background:
            'radial-gradient(70% 60% at 50% 30%, rgba(255,246,238,0.06), rgba(0,0,0,0) 55%), radial-gradient(70% 60% at 50% 70%, rgba(0,0,0,0.18), rgba(0,0,0,0) 55%)'
        }}
      />

      {/* Línea superior sutil, como “paso de sección” */}
      <div
        className="absolute left-1/2 top-0 h-[2px] w-[56vw] -translate-x-1/2"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(222,174,97,0.55), transparent)'
        }}
      />
    </div>
  );
}
