import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './views/Login';
import SideBar from './views/SideBar';
import Show from './components/PuntosAcopio/show';
import './styles/SideBar.css';
import './App.css';

export default function App() {
  const location = useLocation();

  // Verifica si la ruta actual es "/"
  const isRootPath = location.pathname === '/';

  return (
    <div className='principal-container'>
      {/* Renderiza SideBar solo si la ruta no es "/" */}
      {!isRootPath && <SideBar />}
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Puntos-Acopio" element={<Show/>} />
      </Routes>
    </div>
  );
}
