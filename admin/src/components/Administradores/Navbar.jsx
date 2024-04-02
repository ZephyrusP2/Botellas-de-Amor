import { Link, useLocation } from "react-router-dom";
import "../../App.css";
import "../../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useState} from "react";

const NavbarAdministradores = () => {
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
            to="/Administrar/Proyectos"
            className={`button-navbar ocultar ${location.pathname === "/Administrar/Proyectos" ? "active" : ""}`}
          >
            Proyectos
          </Link>
          <Link
            to="/Administrar/Puntos-Acopio"
            className={`button-navbar ocultar ${location.pathname === "/Administrar/Puntos-Acopio" ? "active" : ""}`}
          >
            Puntos de Acopio
          </Link>
          <Link
            to="/Administrar/Usuarios"
            className={`button-navbar ocultar ${location.pathname === "/Administrar/Usuarios" ? "active" : ""}`}
          >
            Usuarios
          </Link>
          <Link
            to="/Administrar/Retos"
            className={`button-navbar ocultar ${location.pathname === "/Administrar/Retos" ? "active" : ""}`}
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
              to="/Administrar/Proyectos"
              className={`navbar-item-sidebar ${location.pathname === "/Administrar/Proyectos" ? "active" : ""}`}
            >
              Proyectos
            </Link>
            <Link
              to="/Administrar/Puntos-Acopio"
              className={`navbar-item-sidebar ${location.pathname === "/Administrar/Puntos-Acopio" ? "active" : ""}`}
            >
              Puntos de Acopio
            </Link>
            <Link
              to="/Administrar/Usuarios"
              className={`navbar-item-sidebar ${location.pathname === "/Administrar/Usuarios" ? "active" : ""}`}
            >
              Usuarios
            </Link>
            <Link
              to="/Administrar/Retos"
              className={`navbar-item-sidebar ${location.pathname === "/Administrar/Retos" ? "active" : ""}`}
            >
              Retos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdministradores;
