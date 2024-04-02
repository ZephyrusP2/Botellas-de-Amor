import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/SideBar.css";

const SideBarAdministradores = () => {
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

    return (
        <div className="col col-auto col-md-3 col-xl-2 px-sm-2 px-0 side-bar">
            <div className="sidebar-container d-flex flex-column align-items-center justify-content-center px-3 pt-2 text-white min-vh-100 position-relative">
                <div>
                    <a href="/Administrar/Proyectos" className={`text-container d-flex  pb-3 align-items-center me-xl-auto text-white text-decoration-none ${currentPath.includes('/Administrar/Proyectos') ? 'active' : ''}`}>
                        <svg className="sidebar-icon" width="52" height="45" viewBox="0 0 46 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.9999 32.7125C23.2777 32.7125 23.5298 32.666 23.7562 32.573C23.9825 32.48 24.1992 32.339 24.4062 32.15C25.5173 31.0625 26.5763 29.9938 27.5832 28.9438C28.5902 27.8938 29.4673 26.8625 30.2145 25.85C30.9603 24.8375 31.5589 23.8535 32.0103 22.898C32.4617 21.9425 32.6874 21.014 32.6874 20.1125C32.6874 18.4625 32.1666 17.0938 31.1249 16.0063C30.0832 14.9188 28.8332 14.375 27.3749 14.375C26.4721 14.375 25.6478 14.5723 24.902 14.9668C24.1562 15.3613 23.5221 15.8765 22.9999 16.5125C22.4791 15.875 21.8284 15.3598 21.0478 14.9668C20.2673 14.5738 19.4596 14.3765 18.6249 14.375C17.1666 14.375 15.9166 14.9188 14.8749 16.0063C13.8332 17.0938 13.3124 18.4625 13.3124 20.1125C13.3124 21.0125 13.5381 21.941 13.9895 22.898C14.4409 23.855 15.0402 24.839 15.7874 25.85C16.5332 26.8625 17.4096 27.8938 18.4166 28.9438C19.4235 29.9938 20.4825 31.0625 21.5937 32.15C21.802 32.3375 22.0193 32.4785 22.2457 32.573C22.4721 32.6675 22.7235 32.714 22.9999 32.7125ZM10.4999 40.25C9.35407 40.25 8.37351 39.8098 7.55824 38.9293C6.74296 38.0488 6.33463 36.989 6.33324 35.75V19.1563L4.2499 20.9C3.76379 21.275 3.24296 21.425 2.6874 21.35C2.13185 21.275 1.68046 20.975 1.33324 20.45C0.986015 19.925 0.856154 19.3625 0.943654 18.7625C1.03115 18.1625 1.2999 17.675 1.7499 17.3L20.4478 1.83127C20.8298 1.53127 21.2381 1.30627 21.6728 1.15627C22.1075 1.00627 22.5499 0.931274 22.9999 0.931274C23.4513 0.931274 23.8943 1.00627 24.3291 1.15627C24.7638 1.30627 25.1714 1.53127 25.552 1.83127L44.302 17.3C44.7534 17.675 45.0138 18.1625 45.0832 18.7625C45.1527 19.3625 45.0138 19.925 44.6666 20.45C44.3193 20.9375 43.868 21.2188 43.3124 21.2938C42.7568 21.3688 42.2534 21.2188 41.802 20.8438L39.6666 19.1563V35.75C39.6666 36.9875 39.2589 38.0473 38.4436 38.9293C37.6284 39.8113 36.6471 40.2515 35.4999 40.25H10.4999Z" fill="#FEFAF9" />
                        </svg>

                        <h1 className="d-none d-xl-inline text">Administrar</h1>
                    </a>
                    <a href="/Administrar/Puntos-Acopio" className={`text-container d-flex align-items-center pb-3 mb-md-0 me-xl-auto text-white text-decoration-none ${currentPath.includes('/Administrar/Puntos-Acopio') ? 'active' : ''}`}>
                        <svg width="52" height="39" viewBox="0 0 52 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40.3 29.25H42.575C43.225 29.25 43.875 28.6 43.875 27.95V4.55C43.875 3.9 43.225 3.25 42.575 3.25H40.3C39.65 3.25 39 3.9 39 4.55V27.95C39 28.6 39.65 29.25 40.3 29.25ZM20.8 29.25H23.075C23.725 29.25 24.375 28.6 24.375 27.95V7.8C24.375 7.15 23.725 6.5 23.075 6.5H20.8C20.15 6.5 19.5 7.15 19.5 7.8V27.95C19.5 28.6 20.15 29.25 20.8 29.25ZM30.55 29.25H32.825C33.475 29.25 34.125 28.6 34.125 27.95V14.3C34.125 13.65 33.475 13 32.825 13H30.55C29.9 13 29.25 13.65 29.25 14.3V27.95C29.25 28.6 29.9 29.25 30.55 29.25ZM50.375 34.125H4.875V1.625C4.875 0.727188 4.14781 0 3.25 0H1.625C0.727187 0 0 0.727188 0 1.625V35.75C0 37.5446 1.45539 39 3.25 39H50.375C51.2728 39 52 38.2728 52 37.375V35.75C52 34.8522 51.2728 34.125 50.375 34.125ZM11.05 29.25H13.325C13.975 29.25 14.625 28.6 14.625 27.95V20.8C14.625 20.15 13.975 19.5 13.325 19.5H11.05C10.4 19.5 9.75 20.15 9.75 20.8V27.95C9.75 28.6 10.4 29.25 11.05 29.25Z" fill="white" />
                        </svg>
                        <h1 className="d-none d-xl-inline text">Análisis</h1>
                    </a>
                </div>
                {/* Mensaje que se mostrará debajo */}
                <div className="position-absolute bottom-0 mb-3">
                    <a href="/Análisis" className="d-flex align-items-center pb-3 mb-md-0 me-xl-auto text-white text-decoration-none">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.75 23.5V27.25C19.75 28.2446 19.4208 29.1984 18.8347 29.9017C18.2487 30.6049 17.4538 31 16.625 31H4.125C3.2962 31 2.50134 30.6049 1.91529 29.9017C1.32924 29.1984 1 28.2446 1 27.25V4.75C1 3.75544 1.32924 2.80161 1.91529 2.09835C2.50134 1.39509 3.2962 1 4.125 1H16C17.7258 1 19.75 2.67906 19.75 4.75V8.5M24.75 23.5L31 16L24.75 8.5M9.75 16H29.75" stroke="white"  />
                        </svg>
                        <h1 className="d-none d-xl-inline text">Cerrar sesion</h1>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SideBarAdministradores;
