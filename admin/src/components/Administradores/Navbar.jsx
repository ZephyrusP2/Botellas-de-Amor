import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../App.css";
import "../../styles/Navbar.css";

const NavbarAdministradores = () => {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="show-container">
      <div className="navbar-container">
        <div className="col">
          <div className="buttons-container">
            <Link
              to="/administrar/proyectos"
              className={`button-navbar ocultar ${location.pathname === "/administrar/proyectos" ? "active" : ""}`}
            >
              Proyectos
            </Link>
            <Link
              to="/administrar/puntos-acopio"
              className={`button-navbar ocultar ${location.pathname === "/administrar/puntos-acopio" ? "active" : ""}`}
            >
              Puntos de Acopio
            </Link>
            <Link
              to="/administrar/usuarios"
              className={`button-navbar ocultar ${location.pathname === "/administrar/usuarios" ? "active" : ""}`}
            >
              Usuarios
            </Link>
            <Link
              to="/administrar/retos"
              className={`button-navbar ocultar ${location.pathname === "/administrar/retos" ? "active" : ""}`}
            >
              Retos
            </Link>
            <div className="burguer">
              <FontAwesomeIcon
                onClick={toggleSidebar}
                icon={faBars}
                className="burger-icon"
              />
            </div>
          </div>
          <div className="buttons-container mt-2">
            <Link
              to="/administrar/disposiciones"
              className={`button-navbar ocultar ${location.pathname === "/administrar/disposiciones" ? "active" : ""}`}
            >
              Disposiciones
            </Link>
            <Link
              to="/administrar/datos-curiosos"
              className={`button-navbar ocultar ${location.pathname === "/administrar/datos-curiosos" ? "active" : ""}`}
            >
              Datos Curiosos
            </Link>
          </div>
        </div>
      </div>
      <div className="navbar-bottom-line"></div>

      <div className={`side-bar2 ${sidebarOpen ? "active" : ""}`}>
        <div className="side-bar2-container">
          <div className="X">
            <FontAwesomeIcon
              onClick={toggleSidebar}
              icon={faTimes}
              className="close-sidebar"
            />
          </div>
          <h1 className="">Menu</h1>

          <div className="navbar-bottom-line2"></div>
          <div className="items-navbar-container">
            <Link
              to="/administrar/proyectos"
              className={`navbar-item-sidebar ${location.pathname === "/administrar/proyectos" ? "active" : ""}`}
            >
              Proyectos
            </Link>
            <Link
              to="/administrar/puntos-acopio"
              className={`navbar-item-sidebar ${location.pathname === "/administrar/puntos-acopio" ? "active" : ""}`}
            >
              Puntos de Acopio
            </Link>
            <Link
              to="/administrar/usuarios"
              className={`navbar-item-sidebar ${location.pathname === "/administrar/usuarios" ? "active" : ""}`}
            >
              Usuarios
            </Link>
            <Link
              to="/administrar/retos"
              className={`navbar-item-sidebar ${location.pathname === "/administrar/retos" ? "active" : ""}`}
            >
              Retos
            </Link>
            <Link
              to="/administrar/disposiciones"
              className={`navbar-item-sidebar ${location.pathname === "/administrar/disposiciones" ? "active" : ""}`}
            >
              Disposiciones
            </Link>
            <Link
              to="/administrar/datos-curiosos"
              className={`navbar-item-sidebar ${location.pathname === "/administrar/datos-curiosos" ? "active" : ""}`}
            >
              Datos Curiosos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdministradores;
