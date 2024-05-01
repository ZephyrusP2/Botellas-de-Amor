import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import projectService from "../../../services/project";
import "../../../styles/Forms.css";

const ShowProject = () => {
  document.title = "Ver proyecto";
  const { id } = useParams();
  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    const getProject = async () => {
      const token = localStorage.getItem("token");
      const response = await projectService.showProject(id, token);
      setProjectData(response.data);
    };

    getProject();
  }, [id]);

  return (
    <>
      <SideBarAdministradores />
      <div className="d-flex flex-column container-fluid p-2">
        <BackButton route="/administrar/proyectos" />
        <div className="d-flex align-items-center flex-column mt-5">
          <h2 className="blue-text display-5 small-text">
            <strong>Nombre</strong>
          </h2>
          <p className="display-6 small-text">{projectData.name}</p>

          <h2 className="blue-text display-5 small-text">
            <strong>Imagen</strong>
          </h2>
          <img
            src={projectData.image}
            className="display-6 small-text image-acopio"
            alt="Imagen de la página"
            width={200}
          />

          <h2 className="blue-text display-5 small-text">
            <strong>Ubicación</strong>
          </h2>
          <p className="display-6 small-text">{projectData.location}</p>

          <h2 className="blue-text display-5 small-text">
            <strong>Descripción</strong>
          </h2>
          <p className="display-6 small-text">{projectData.description}</p>

          <h2 className="blue-text display-5 small-text">
            <strong>Meta de toneladas</strong>
          </h2>
          <p className="display-6 small-text">{projectData.goal_tons}</p>

          <h2 className="blue-text display-5 small-text">
            <strong>Toneladas recolectadas</strong>
          </h2>
          <p className="display-6 small-text">{projectData.total_tons}</p>

          <h2 className="blue-text display-5 small-text">
            <strong>Organizaciones aliadas</strong>
          </h2>
          <p className="display-6 small-text">{projectData.organizations}</p>

          <h2 className="blue-text display-5 small-text">
            <strong>Estado</strong>
          </h2>
          <p className="display-6 small-text">{projectData.status}</p>
        </div>
      </div>
    </>
  );
};

export default ShowProject;
