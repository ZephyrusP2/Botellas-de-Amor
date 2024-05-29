import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBarAdministradores from "../../components/Administradores/SideBar";
import BackButton from "../../components/BackButton";
import dispositionService from "../../services/disposition";
import "../../styles/Forms.css";

const ShowRegister = () => {
  document.title = "Ver disposición";
  const { id } = useParams();
  const [dispositionData, setDispositionData] = useState({});

  useEffect(() => {
    const getDisposition = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await dispositionService.showDisposition(id, token);
        setDispositionData(response.data);
      } catch (error) {
        console.error("Error fetching disposition:", error);
      }
    };

    getDisposition();
  }, [id]);

  return (
    <>
      <SideBarAdministradores />
      <div className="d-flex flex-column container-fluid p-2">
        <BackButton route="/operador/registrar-botellas/historial" />
        <div className="d-flex align-items-center flex-column mt-5">
          <h2 className="blue-text display-5 small-text">
            <strong>Punto de acopio</strong>
          </h2>
          <p className="display-6 small-text">{dispositionData.site}</p>
          <h2 className="blue-text display-5 small-text">
            <strong>Numero de botellas</strong>
          </h2>
          <p className="display-6 small-text">{dispositionData.bottles}</p>
          <h2 className="blue-text display-5 small-text">
            <strong>Peso de las botellas</strong>
          </h2>
          <p className="display-6 small-text">{dispositionData.weight}</p>
          <h2 className="blue-text display-5 small-text">
            <strong>Id del usuario</strong>
          </h2>
          <p className="display-6 small-text">{dispositionData.user}</p>
          <h2 className="blue-text display-5 small-text">
            <strong>Id del operador</strong>
          </h2>
          <p className="display-6 small-text">{dispositionData.operator}</p>
        </div>
      </div>
    </>
  );
};

export default ShowRegister;
