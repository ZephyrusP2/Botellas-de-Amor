import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import factService from "../../../services/fact";
import "../../../styles/Forms.css";

const ShowFact = () => {
    document.title = "Ver dato curioso";
    const { id } = useParams();
    const [factData, setFactData] = useState({});

    useEffect(() => {
        const getFact = async () => {
            const token = localStorage.getItem("token");
            const response = await factService.showFact(id, token);
            setFactData(response.data);
        };

        getFact();
    }, [id]);

    return (
        <>
            <SideBarAdministradores />
            <div className="d-flex flex-column container-fluid p-2">
                <BackButton route="/administrar/datos-curiosos" />
                <div className="d-flex align-items-center flex-column mt-5">
                    <h2 className="blue-text display-5 small-text">
                        <strong>Mensaje</strong>
                    </h2>
                    <p className="display-6 small-text">{factData.message}</p>
                </div>
            </div>
        </>
    );
}

export default ShowFact;