import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import "./styles/SideBar.css";
import Login from "./views/LoginView";

import IndexProject from "./views/Administradores/Proyectos/IndexProject";
import CreateProject from "./views/Administradores/Proyectos/CreateProject";
import EditProject from "./views/Administradores/Proyectos/EditProject";
import ShowProject from "./views/Administradores/Proyectos/ShowProject";

import CreateChallenge from "./views/Administradores/Retos/CreateChallenge";
import EditChallenge from "./views/Administradores/Retos/EditChallenge";
import IndexChallenge from "./views/Administradores/Retos/IndexChallenge";
import ShowChallenge from "./views/Administradores/Retos/ShowChallenge";

import CreateSite from "./views/Administradores/PuntosAcopio/CreateSite";
import EditSite from "./views/Administradores/PuntosAcopio/EditSite";
import IndexSite from "./views/Administradores/PuntosAcopio/IndexSite";
import ShowSite from "./views/Administradores/PuntosAcopio/ShowSite";

import CreateUser from "./views/Administradores/Usuarios/CreateUser";
import EditUser from "./views/Administradores/Usuarios/EditUser";
import IndexUser from "./views/Administradores/Usuarios/IndexUser";
import ShowUser from "./views/Administradores/Usuarios/ShowUser";

import CreateDisposal from "./views/Administradores/Disposiciones/CreateDisposal";
import IndexDisposal from "./views/Administradores/Disposiciones/IndexDisposal";
import ShowDisposal from "./views/Administradores/Disposiciones/ShowDisposal";
import EditDisposal from "./views/Administradores/Disposiciones/EditDisposal";

import IndexFact from "./views/Administradores/Facts/IndexFact";
import CreateFact from "./views/Administradores/Facts/CreateFact";
import EditFact from "./views/Administradores/Facts/EditFact";

import CreateRegister from "./views/Operadores/Create";
import IndexRegister from "./views/Operadores/Index";
import EditRegister from "./views/Operadores/Edit";
import ShowRegister from "./views/Operadores/Show";

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  return (
    <div className="principal-container">
      <Routes>
        <Route path="/" element={<Login />} />
        {localStorage.getItem("token") === null ? (
          <>
            <Route path="/" element={<Login />} />
          </>
        ) : (
          <>
            {localStorage.getItem("role") === "admin" ? (
              <>
                {/* RUTAS DE ADMINISTRADORES */}
                <Route path="/" element={<Login />} />
                <Route
                  path="/administrar/proyectos"
                  element={<IndexProject />}
                />
                <Route
                  path="/administrar/proyectos/crear"
                  element={<CreateProject />}
                />
                <Route
                  path="/administrar/proyectos/editar/:id"
                  element={<EditProject />}
                />
                <Route
                  path="/administrar/proyectos/:id"
                  element={<ShowProject />}
                />
                <Route path="/administrar/retos" element={<IndexChallenge />} />
                <Route
                  path="/administrar/retos/crear"
                  element={<CreateChallenge />}
                />
                <Route
                  path="/administrar/retos/editar/:id"
                  element={<EditChallenge />}
                />
                <Route
                  path="/administrar/retos/:id"
                  element={<ShowChallenge />}
                />
                <Route
                  path="/administrar/puntos-acopio"
                  element={<IndexSite />}
                />
                <Route
                  path="/administrar/puntos-acopio/crear"
                  element={<CreateSite />}
                />
                <Route
                  path="/administrar/puntos-acopio/editar/:id"
                  element={<EditSite />}
                />
                <Route
                  path="/administrar/puntos-acopio/:id"
                  element={<ShowSite />}
                />
                <Route path="/administrar/retos" element={<IndexChallenge />} />
                <Route
                  path="/administrar/retos/crear"
                  element={<CreateChallenge />}
                />
                <Route
                  path="/administrar/retos/editar/:id"
                  element={<EditChallenge />}
                />
                <Route
                  path="/administrar/retos/:id"
                  element={<ShowChallenge />}
                />
                <Route path="/administrar/usuarios" element={<IndexUser />} />
                <Route
                  path="/administrar/usuarios/crear"
                  element={<CreateUser />}
                />
                <Route
                  path="/administrar/usuarios/editar/:id"
                  element={<EditUser />}
                />
                <Route
                  path="/administrar/usuarios/:id"
                  element={<ShowUser />}
                />
                <Route
                  path="/administrar/disposiciones"
                  element={<IndexDisposal />}
                />
                <Route
                  path="/administrar/disposiciones/crear"
                  element={<CreateDisposal />}
                />
                <Route
                  path="/administrar/disposiciones/:id"
                  element={<ShowDisposal />}
                />
                <Route
                  path="/administrar/disposiciones/editar/:id"
                  element={<EditDisposal />}
                />
                <Route
                  path="/administrar/datos-curiosos"
                  element={<IndexFact />}
                />
                <Route
                  path="/administrar/datos-curiosos/crear"
                  element={<CreateFact />}
                />
                <Route
                  path="/administrar/datos-curiosos/editar/:id"
                  element={<EditFact />}
                />
              </>
            ) : (
              <>
                <Route
                  path="/operador/registrar-botellas"
                  element={<CreateRegister />}
                />
                <Route
                  path="/operador/registrar-botellas/historial"
                  element={<IndexRegister />}
                />
                <Route
                  path="/operador/registrar-botellas/editar/:id"
                  element={<EditRegister />}
                />
                <Route
                  path="/operador/registrar-botellas/:id"
                  element={<ShowRegister />}
                />
              </>
            )}
          </>
        )}
      </Routes>
    </div>
  );
}
