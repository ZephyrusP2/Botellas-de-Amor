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

import IndexUser from "./views/Administradores/Usuarios/IndexUser";
import CreateUser from "./views/Administradores/Usuarios/CreateUser";
import ShowUser from "./views/Administradores/Usuarios/ShowUser";
import EditUser from "./views/Administradores/Usuarios/EditUser";

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
      <Routes>
        {localStorage.getItem("token") === null ? (
          <>
            <Route path="/" element={<Login />} />
          </>
        ) : (
          <>
            {localStorage.getItem("role") === "admin" ? (
              <>
                {/*<SideBarAdministradores >  */}


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

                {/* RUTAS DE ADMINISTRADORES */}
                <Route
                  path="/Administrar/Proyectos"
                  element={<ShowProyectos />}
                />
                <Route
                  path="/Administrar/Puntos-Acopio"
                  element={<ShowPuntosAcopio />}
                />

                <Route path="/Administrar/Retos" element={<IndexChallenge />} />
                <Route
                  path="/Administrar/Retos/Crear"
                  element={<CreateChallenge />}
                />
                <Route
                  path="/Administrar/Retos/Editar/:id"
                  element={<EditChallenge />}
                />
                <Route
                  path="/Administrar/Retos/:id"
                  element={<ShowChallenge />}
                />

                <Route path="/Administrar/Usuarios" element={<IndexUser />} />
                <Route
                  path="/Administrar/Usuarios/Crear"
                  element={<CreateUser />}
                />
                <Route
                  path="/Administrar/Usuarios/Editar/:id"
                  element={<EditUser />}
                />
                <Route
                  path="/Administrar/Usuarios/:id"
                  element={<ShowUser />}
                />
              </>
            ) : (
              <>
                <SideBarOperadores />

                {/* RUTAS DE OPERADORES */}
                <Route path="/Registro-Botellas" element={<OperatorView />} />
                <Route path="/Registro-Botellas" element={<OperatorView />} />
              </>
            )}
          </>
        )}
      </Routes>
    </div>
  );
}
