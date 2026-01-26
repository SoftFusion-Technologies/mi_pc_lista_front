import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './Layout/Navbar.jsx';
import routes from './Routes/Rutas.jsx';
import Footer from './Layout/Footer.jsx';
import { useEffect } from 'react';

import { AuthProvider } from './AuthContext';
// cambio agregado por Benjamin Orellana
// aqui dentro ponemos las rutas en las que no queremos mostrar el nav

export default function App() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  return (
    <AuthProvider>
      {/* El Navbar se mostrará en todas las páginas si está fuera de <Routes> */}
      <Navbar />
      <Routes>
        {/* Ruta pública para Login */}
        {/* Rutas protegidas */}
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        {/* Ruta para redirigir si se intenta acceder a la raíz sin estar logueado */}
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}
