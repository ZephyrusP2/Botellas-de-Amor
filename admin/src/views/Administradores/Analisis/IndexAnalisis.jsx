import React from "react";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import "../../../styles/Forms.css";

const IndexAnalisis = () => {
    return (
        <>
            <SideBarAdministradores />
            <div className="d-flex flex-column container-fluid p-2">
                <div className="d-flex align-items-center flex-column mt-5">
                    <h2 className="blue-text display-5 small-text">
                        <strong>Estadísticas</strong>
                    </h2>
                    <p className="display-6 small-text">Aquí se mostrarán las estadísticas de la aplicación.</p>
                </div>
            </div>
        </>
    );
}

export default IndexAnalisis;