import React, { useEffect, useState } from "react";
import siteService from "../../../services/site";
import { useParams } from "react-router-dom";
import "../../../styles/Forms.css";
import BackButton from "../../../components/BackButton";
import SideBarAdministradores from "../../../components/Administradores/SideBar";

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
        <BackButton route="/Administrar/Puntos-Acopio" />
        <div className="d-flex align-items-center flex-column">
          <h2 className="blue-text">
            <strong>Reto</strong>
          </h2>
          <p>{siteData.site}</p>
          <h2 className="blue-text">
            <strong>Experiencia</strong>
          </h2>
          <p>{siteData.experience}</p>
        </div>
      </div>
    </>
  );
};

export default ShowSite;
