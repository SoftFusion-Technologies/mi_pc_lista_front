import Home from "../Pages/Public/Home.jsx";
import PcEstudio from "../Pages/PcEstudio.jsx";
import PcTrabajo from "../Pages/PcTrabajo.jsx";
import PcPro from "../Pages/PcPro.jsx";
import ComoPedir from "../Pages/ComoPedir.jsx";
import Garantia from "../Pages/Garantia.jsx";
import Contacto from "../Pages/Contacto.jsx";

const routes = [
  {
    path: '/',
    element: <Home />,
    name: 'Home',
    showInNav: false
  },
  {
    path: '/pc-estudio',
    element: <PcEstudio />,
    name: 'Pc de Estudio',
    showInNav: true
  },
  {
    path: '/pc-trabajo',
    element: <PcTrabajo />,
    name: 'Pc de Trabajo',
    showInNav: true
  },
  {
    path: '/pc-pro',
    element: <PcPro />,
    name: 'Pc Profesional',
    showInNav: true
  },
  {
    path: '/como-pedir',
    element: <ComoPedir />,
    name: '¿Cómo Pedir?',
    showInNav: true
  },
  {
    path: '/garantia',
    element: <Garantia />,
    name: 'Garantía',
    showInNav: true
  },
  {
    path: '/contacto',
    element: <Contacto />,
    name: 'Contacto',
    showInNav: true
  }
];

export default routes;