import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Layout/Navbar.jsx';
import routes from './Routes/Rutas.jsx';
import Footer from './Layout/Footer.jsx';
import { useEffect, useState } from 'react';

import { AuthProvider } from './AuthContext';
import NotFound from './Pages/NotFound.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import FloatingWhatsAppCta from './components/FloatingWhatsAppCta.jsx';
import WelcomeModal from './components/WelcomeModal.jsx';

export default function App() {
  const location = useLocation();

  // Benjamin Orellana - 2026-02-02 - Controla apertura de modal de bienvenida 1 vez por visita (session), y permite que reaparezca si el usuario sale y vuelve a entrar al sitio.
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Benjamin Orellana - 2026-02-02 - Abre la modal solo si no se mostró en esta visita; al salir del sitio se limpia el flag para que aparezca en la próxima entrada.
  useEffect(() => {
    const KEY = 'pc_welcome_seen_session_v1';

    try {
      const seen = sessionStorage.getItem(KEY);
      if (!seen) setWelcomeOpen(true);
    } catch {
      setWelcomeOpen(true);
    }

    const clearOnLeave = () => {
      try {
        sessionStorage.removeItem(KEY);
      } catch {
        // noop
      }
    };

    // pagehide cubre navegación afuera y cierre de pestaña; beforeunload cubre ciertos casos legacy
    window.addEventListener('pagehide', clearOnLeave);
    window.addEventListener('beforeunload', clearOnLeave);

    return () => {
      window.removeEventListener('pagehide', clearOnLeave);
      window.removeEventListener('beforeunload', clearOnLeave);
    };
  }, []);

  const whatsappHref = 'https://wa.me/5495493517612425';

  const closeWelcome = () => {
    setWelcomeOpen(false);
    try {
      sessionStorage.setItem('pc_welcome_seen_session_v1', '1');
    } catch {
      // noop
    }
  };

  return (
    <AuthProvider>
      <Navbar />

      <ScrollToTop
        top={0}
        behavior="auto"
        exclude={['/tickets', '/list']} // ejemplo
        animate
        durationMs={520}
        easing="easeOutCubic"
        showOverlay
      />

      <FloatingWhatsAppCta
        whatsappHref={whatsappHref}
        label="TE AYUDAMOS A ELEGIR BIEN"
      />

      <WelcomeModal
        open={welcomeOpen}
        onClose={closeWelcome}
        whatsappHref={whatsappHref}
        zona="Córdoba Capital"
      />

      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        <Route
          path="*"
          element={
            <NotFound whatsappUrl={whatsappHref} zona="Córdoba Capital" />
          }
        />
      </Routes>

      <Footer />
    </AuthProvider>
  );
}
