import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './views/LoginView';
import SideBar from './components/SideBar';
import './styles/SideBar.css';
import './App.css';
import OperatorView from "./views/OperatorView"
import ShowPuntosAcopio from "./views/Administradores/PuntosAcopio/Show"
import ShowProyectos from "./views/Administradores/Proyectos/Show"



export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isRootPath = location.pathname === '/' || location.pathname.startsWith('/Operador');

  return (
    <div className='principal-container'>
      {!isRootPath && <SideBar />}
      <Routes>
        <Route path="/" element={<Login />} />

        {/* RUTAS DE ADMINISTRADORES */}
        <Route path="/Administrar/Proyectos" element={<ShowProyectos />} />
        <Route path="/Administrar/Puntos-Acopio" element={<ShowPuntosAcopio />} />

        {/* RUTAS DE OPERADORES */}
        <Route path="/Operador" element={<OperatorView />} />
        <Route path="/Operador" element={<OperatorView />} />


      </Routes>
    </div>
  );
}
