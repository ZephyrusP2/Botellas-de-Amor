import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import projectService from "../../../services/project";
import "../../../styles/Forms.css";

const CreateProject = () => {
  document.title = "Crear proyecto";
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: "",
    image: "",
    location: "",
    description: "",
    goal_tons: 0,
    total_tons: 0,
    organizations: "",
    status: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const validateProject = () => {
    const errors = {};
    if (!project.name) {
      errors.name = "Se requiere el nombre del proyecto";
    }
    if (!project.image) {
      errors.image = "Se requiere la imagen del proyecto";
    }
    if (!project.location) {
      errors.location = "Se requiere la ubicación del proyecto";
    }
    if (!project.description) {
      errors.description = "Se requiere la descripción del proyecto";
    }
    if (project.goal_tons <= 0) {
      errors.goal_tons = "La meta de toneladas debe ser un número positivo";
    }
    if (project.total_tons < 0) {
      errors.total_tons = "El total de toneladas no puede ser negativo";
    }
    if (!project.organizations) {
      errors.organizations = "Se requiere la organización del proyecto";
    }
    if (!project.status) {
      errors.status = "Se requiere el estado del proyecto";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateProject()) {
      return;
    }

    const token = localStorage.getItem("token");
    const data = {
      name: project.name,
      image: project.image,
      location: project.location,
      description: project.description,
      goal_tons: project.goal_tons.toString(),
      total_tons: project.total_tons.toString(),
      organizations: project.organizations,
      status: project.status,
    };


    try {
      const response = await projectService.createProject(data, token);
      console.log("Project created:", response);
      setProject({
        name: "",
        image: "",
        location: "",
        description: "",
        goal_tons: 0,
        total_tons: 0,
        organizations: "",
        status: "",
      });
      navigate(`/administrar/proyectos`);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      <SideBarAdministradores />
      <div className="d-flex flex-column align-items-start p-4 container-fluid overflow-auto">
        <BackButton route="/administrar/proyectos" />
        <h1 className="container-fluid text-center">Crear Proyecto</h1>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center container m-0 p-0"
        >
          <label className="d-flex flex-column form-label w-50">
            Nombre
            <input
              type="text"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              className="form-control rounded-3"
            />
            {validationErrors.name && (
              <span className="error-message">{validationErrors.name}</span>
            )}
          </label>
          <label className="d-flex flex-column form-label w-50">
            Imagen
            <input
              type="text"
              value={project.image}
              onChange={(e) =>
                setProject({ ...project, image: e.target.value })
              }
              className="form-control rounded-3"
            />
            {validationErrors.image && (
              <span className="error-message">{validationErrors.image}</span>
            )}
          </label>
          <label className="d-flex flex-column form-label w-50">
            Ubicación
            <input
              type="text"
              value={project.location}
              onChange={(e) =>
                setProject({ ...project, location: e.target.value })
              }
              className="form-control rounded-3"
            />
            {validationErrors.location && (
              <span className="error-message">{validationErrors.location}</span>
            )}
          </label>
          <label className="d-flex flex-column form-label w-50">
            Descripción
            <textarea
              type="text"
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
              className="form-control rounded-3"
            />
            {validationErrors.description && (
              <span className="error-message">
                {validationErrors.description}
              </span>
            )}
          </label>
          <label className="d-flex flex-column form-label w-50">
            Meta de Toneladas
            <input
              type="number"
              value={project.goal_tons}
              onChange={(e) =>
                setProject({ ...project, goal_tons: e.target.value })
              }
              className="form-control rounded-3"
            />
            {validationErrors.goal_tons && (
              <span className="error-message">
                {validationErrors.goal_tons}
              </span>
            )}
          </label>
          <label className="d-flex flex-column form-label w-50">
            Total de Toneladas Recolectadas
            <input
              type="number"
              value={project.total_tons}
              onChange={(e) =>
                setProject({ ...project, total_tons: e.target.value })
              }
              className="form-control rounded-3"
            />
            {validationErrors.total_tons && (
              <span className="error-message">
                {validationErrors.total_tons}
              </span>
            )}
          </label>
          <label className="d-flex flex-column form-label w-50">
            Organización
            <input
              type="text"
              value={project.organizations}
              onChange={(e) =>
                setProject({ ...project, organizations: e.target.value })
              }
              className="form-control rounded-3"
            />
            {validationErrors.organizations && (
              <span className="error-message">
                {validationErrors.organizations}
              </span>
            )}
          </label>
          <label className="d-flex flex-column form-label w-50">
            Estado
            <select
              className="form-control rounded-3"
              value={project.status}
              onChange={(e) =>
                setProject({ ...project, status: e.target.value })
              }
            >
              <option value="">Seleccionar rol</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
            {validationErrors.status && (
              <span className="error-message">{validationErrors.status}</span>
            )}
          </label>
          <br />
          <button type="submit" className="btn btn-primary btn-md w-50">
            crear
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
