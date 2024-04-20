import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import siteService from "../../../services/site";
import "../../../styles/Forms.css";

const ShowSite = () => {
  document.title = "Ver reto";
  const { id } = useParams();
  const [siteData, setSiteData] = useState({});

  useEffect(() => {
    const getSite = async () => {
      const token = localStorage.getItem("token");
      const response = await siteService.showSite(id, token);
      setSiteData(response.data);
    };

    getSite();
  }, [id]);

  return (
    <>
      <SideBarAdministradores />
      <div className="d-flex flex-column container-fluid p-2">
        <BackButton route="/administrar/puntos-acopio" />
        <div className="d-flex align-items-center flex-column mt-3">
        <h2 className="blue-text display-5 small-text">
          <strong>Imagen</strong>
        </h2>
        <img src={siteData.image} className="display-6 small-text image-acopio" alt="Imagen de la página" />

          <h2 className="blue-text display-5 small-text">
            <strong>Hora de apertura</strong>
          </h2>
          <p className="display-6 small-text">{siteData.opens}</p>
          <h2 className="blue-text display-6 small-text">
            <strong>Hora de cierre</strong>
          </h2>
          <p className="display-6 small-text">{siteData.closes}</p>
          <h2 className="blue-text display-5 small-text">
            <strong>Nombre</strong>
          </h2>
          <p className="display-6 small-text">{siteData.name}</p>
          <h2 className="blue-text display-5 small-text">
            <strong>Direccion</strong>
          </h2>
          <p className="display-6 small-text">{siteData.address}</p>
        </div>
      </div>
    </>
  );
};

export default ShowSite;
