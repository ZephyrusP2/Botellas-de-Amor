import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../App.css";
import colombia from "../assets/images/colombia.png";

const Navbar = () => {
    const location = useLocation();

    return (
        <div className="show-container">
            <div className="navbar-container">
                <div className="buttons-container">
                    <Link to="/Proyectos" className={`button-navbar ${location.pathname === '/Proyectos' ? 'active' : ''}`}>
                        Proyectos
                    </Link>
                    <Link to="/Puntos-Acopio" className={`button-navbar ${location.pathname === '/Puntos-Acopio' ? 'active' : ''}`}>
                        Puntos de Acopio
                    </Link>
                    <Link to="/Administradores" className={`button-navbar ${location.pathname === '/Administradores' ? 'active' : ''}`}>
                        Administradores
                    </Link>
                    <Link to="/Operadores" className={`button-navbar ${location.pathname === '/Operadores' ? 'active' : ''}`}>
                        Operadores
                    </Link>
                </div>
                <img className="colombia-image" src={colombia} alt="Colombia Flag"/>
            </div>
            <div className="navbar-bottom-line"></div> {/* Línea debajo del navbar */}
        </div>
    );
};

export default Navbar;
