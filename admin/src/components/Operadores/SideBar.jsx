import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/SideBar.css";

const SideBarOperadores = () => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const handleRouteChange = () => {
            setCurrentPath(window.location.pathname);
        };

        // Agrega un event listener para detectar cambios en la ruta
        window.addEventListener('popstate', handleRouteChange);

        // Limpia el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate("/");
      };

    return (
        <div className="col col-auto col-md-3 col-xl-2 px-sm-2 px-0 side-bar">
            <div className="sidebar-container d-flex flex-column align-items-center justify-content-center px-3 pt-2 text-white min-vh-100 position-relative">
                <div>
                    <a href="/Registro-Botellas" className={`text-container d-flex  pb-3 align-items-center me-xl-auto text-white text-decoration-none ${currentPath.includes('/Registro-Botellas') ? 'active' : ''}`}>
                        <svg width="41" height="39" viewBox="0 0 41 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35.874 4.875H27.3326C27.3326 2.18613 24.2683 0 20.4994 0C16.7305 0 13.6663 2.18613 13.6663 4.875H5.12485C2.29551 4.875 0 6.5127 0 8.53125V35.3438C0 37.3623 2.29551 39 5.12485 39H35.874C38.7033 39 40.9988 37.3623 40.9988 35.3438V8.53125C40.9988 6.5127 38.7033 4.875 35.874 4.875ZM20.4994 3.04688C21.9194 3.04688 23.0618 3.86191 23.0618 4.875C23.0618 5.88809 21.9194 6.70312 20.4994 6.70312C19.0794 6.70312 17.937 5.88809 17.937 4.875C17.937 3.86191 19.0794 3.04688 20.4994 3.04688ZM35.874 34.8867C35.874 35.1381 35.5857 35.3438 35.2334 35.3438H5.76546C5.41313 35.3438 5.12485 35.1381 5.12485 34.8867V8.98828C5.12485 8.73691 5.41313 8.53125 5.76546 8.53125H10.2497V11.2734C10.2497 11.7762 10.8263 12.1875 11.5309 12.1875H29.4679C30.1726 12.1875 30.7491 11.7762 30.7491 11.2734V8.53125H35.2334C35.5857 8.53125 35.874 8.73691 35.874 8.98828V34.8867Z" fill="white" />
                        </svg>

                        <h1 className="d-none d-xl-inline text">Registro</h1>
                    </a>
                    
                </div>
                {/* Mensaje que se mostrará debajo */}
                <div
          className="position-absolute bottom-0 mb-3 hover-cursor"
          onClick={logout}
        >
                    <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-xl-auto text-white text-decoration-none">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.75 23.5V27.25C19.75 28.2446 19.4208 29.1984 18.8347 29.9017C18.2487 30.6049 17.4538 31 16.625 31H4.125C3.2962 31 2.50134 30.6049 1.91529 29.9017C1.32924 29.1984 1 28.2446 1 27.25V4.75C1 3.75544 1.32924 2.80161 1.91529 2.09835C2.50134 1.39509 3.2962 1 4.125 1H16C17.7258 1 19.75 2.67906 19.75 4.75V8.5M24.75 23.5L31 16L24.75 8.5M9.75 16H29.75" stroke="white" />
                        </svg>
                        <h1 className="d-none d-xl-inline text">Cerrar sesion</h1>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SideBarOperadores;

