import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Login from "./views/LoginView";
import SideBarAdministradores from "./components/Administradores/SideBar";
import SideBarOperadores from "./components/Operadores/SideBar"; // Importar Sidebar2
import "./styles/SideBar.css";
import "./App.css";
import OperatorView from "./views/OperatorView";
import ShowProyectos from "./views/Administradores/Proyectos/Show";
import ShowUsuarios from "./views/Administradores/Usuarios/Show";



import CreateChallenge from "./views/Administradores/Retos/CreateChallenge";
import ShowChallenge from "./views/Administradores/Retos/ShowChallenge";
import EditChallenge from "./views/Administradores/Retos/EditChallenge";
import IndexChallenge from "./views/Administradores/Retos/IndexChallenge";

import CreateSite from "./views/Administradores/PuntosAcopio/CreateAcopio";
import ShowSite from "./views/Administradores/PuntosAcopio/ShowAcopio";
import EditSite from "./views/Administradores/PuntosAcopio/EditAcopio";
import IndexSite from "./views/Administradores/PuntosAcopio/IndexAcopio";



export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  return (
    <div className="principal-container">
      {isRootPath ? null : location.pathname.startsWith(
          "/Registro-Botellas"
        ) ? (
        <SideBarOperadores />
      ) : (
        <SideBarAdministradores />
      )}
      <Routes>
        <Route path="/" element={<Login />} />

        {/* RUTAS DE ADMINISTRADORES */}
        <Route path="/Administrar/Proyectos" element={<ShowProyectos />} />
        <Route path="/Administrar/Usuarios" element={<ShowUsuarios />} />


        <Route path="/Administrar/Retos" element={<IndexChallenge />} />
        <Route path="/Administrar/Retos/Crear" element={<CreateChallenge />} />
        <Route path="/Administrar/Retos/Editar/:id" element={<EditChallenge />}/>
        <Route path="/Administrar/Retos/:id" element={<ShowChallenge />} />

        <Route path="/Administrar/Puntos-Acopio" element={<IndexSite />} />
        <Route path="/Administrar/Puntos-Acopio/Crear" element={<CreateSite  />} />
        <Route path="/Administrar/Puntos-Acopio/Editar/:id" element={<EditSite  />}/>
        <Route path="/Administrar/Puntos-Acopio/:id" element={<ShowSite  />} />

        {/* RUTAS DE OPERADORES */}
        <Route path="/Registro-Botellas" element={<OperatorView />} />
        <Route path="/Registro-Botellas" element={<OperatorView />} />
      </Routes>
    </div>
  );
}
