import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './views/LoginView';
import SideBarAdministradores from './components/Administradores/SideBar';
import SideBarOperadores from './components/Operadores/SideBar'; // Importar Sidebar2
import './styles/SideBar.css';
import './App.css';
import OperatorView from "./views/OperatorView";
import ShowPuntosAcopio from "./views/Administradores/PuntosAcopio/Show";
import ShowProyectos from "./views/Administradores/Proyectos/Show";

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isRootPath = location.pathname === '/';

  return (
    <div className='principal-container'>
      {isRootPath ? null : (location.pathname.startsWith('/Registro-Botellas') ? <SideBarOperadores /> : <SideBarAdministradores />)}
      <Routes>
        <Route path="/" element={<Login />} />

        {/* RUTAS DE ADMINISTRADORES */}
        <Route path="/Administrar/Proyectos" element={<ShowProyectos />} />
        <Route path="/Administrar/Puntos-Acopio" element={<ShowPuntosAcopio />} />

        {/* RUTAS DE OPERADORES */}
        <Route path="/Registro-Botellas" element={<OperatorView />} />
        <Route path="/Registro-Botellas" element={<OperatorView />} />
      </Routes>
    </div>
  );
}
