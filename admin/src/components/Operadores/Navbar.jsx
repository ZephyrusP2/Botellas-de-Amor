import { Link, useLocation } from "react-router-dom";
import "../../App.css";
import "../../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

const NavbarOperadores = () => {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="show-container">
      <div className="navbar-container">
        <div className="buttons-container">
          <Link
            to="/operador/registrar-botellas"
            className={`button-navbar ocultar ${location.pathname === "/operador/registrar-botellas" ? "active" : ""}`}
          >
            Registro
          </Link>
          <Link
            to="/operador/registrar-botellas/historial"
            className={`button-navbar ocultar ${location.pathname === "/operador/registrar-botellas/historial" ? "active" : ""}`}
          >
            Historial
          </Link>

          <div className="burguer">
            <FontAwesomeIcon
              onClick={toggleSidebar}
              icon={faBars}
              className="burger-icon"
            />
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
              to="/operador/registrar-botellas"
              className={`navbar-item-sidebar ${location.pathname === "/operador/registrar-botellas" ? "active" : ""}`}
            >
              Proyectos
            </Link>
            <Link
              to="/operador/registrar-botellas/Historial"
              className={`navbar-item-sidebar ${location.pathname === "/operador/registrar-botellas/Historial" ? "active" : ""}`}
            >
              Puntos de Acopio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarOperadores;
