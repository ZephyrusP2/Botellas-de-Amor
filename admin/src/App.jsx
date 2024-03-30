import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './views/LoginView';
import SideBar from './components/SideBar';
import './styles/SideBar.css';
import './App.css';
import AdminView from "./views/AdminView"
import OperatorView from "./views/OperatorView"

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
        <Route path="/Administrador" element={<AdminView />} />
        <Route path="/Operador" element={<OperatorView />} />
      </Routes>
    </div>
  );
}
