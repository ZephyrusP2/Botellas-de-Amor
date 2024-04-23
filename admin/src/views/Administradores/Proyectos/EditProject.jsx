import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import projectService from "../../../services/project";
import "../../../styles/Forms.css";
import project from "../../../services/project";

const EditProject = () => {
  document.title = "Editar proyecto";
  const { id } = useParams();
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState({
    name: "",
    image: null,
    location: "",
    description: "",
    goal_tons: 0,
    total_tons: 0,
    organizations: "",
    status: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validateProject = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Se requiere un nombre para el proyecto";
    }
    if (!data.status) {
      errors.status = "Selecciona un estado para el proyecto";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProjectData({
      ...projectData,
      image: file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateProject(projectData)) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      if (projectData.image) {
        formData.append("image", projectData.image);
      }
      formData.append("name", projectData.name);
      formData.append("location", projectData.location);
      formData.append("description", projectData.description);
      formData.append("goal_tons", projectData.goal_tons.toString());
      formData.append("total_tons", projectData.total_tons.toString());
      formData.append("organizations", projectData.organizations);
      formData.append("status", projectData.status);

      const response = await projectService.updateProject(id, formData, token);
      console.log("Project updated successfully:", response.data);
      navigate(`/administrar/proyectos`);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  useEffect(() => {
    const getProject = async () => {
      const token = localStorage.getItem("token");
      const response = await projectService.showProject(id, token);
      response.data.image = null;
      setProjectData(response.data);
    };

    getProject();
  }, [id]);

  return (
    <>
      <SideBarAdministradores />
      <div className="container-fluid p-4">
        <BackButton route="/administrar/proyectos" />
        <h2 className="container-fluid text-center">Editar proyecto</h2>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center container m-0 p-0"
        >
          <label className="d-flex flex-column form-label w-50">
            Nombre
            <input
              type="text"
              name="name"
              value={projectData.name}
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
            {validationErrors.name && (
              <span className="error-message">{validationErrors.name}</span>
            )}
          </label>
          <label className="d-flex flex-column form-label w-50">
            Imagen
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
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
              name="location"
              value={projectData.location}
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
          </label>
          <label className="d-flex flex-column form-label w-50">
            Descripción
            <textarea
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              className="form-control rounded-3"
              rows="4"
            ></textarea>
          </label>

          <label className="d-flex flex-column form-label w-50">
            Meta de toneladas
            <input
              type="number"
              name="goal_tons"
              value={projectData.goal_tons}
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
          </label>

          <label className="d-flex flex-column form-label w-50">
            Toneladas recolectadas
            <input
              type="number"
              name="total_tons"
              value={projectData.total_tons}
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
          </label>

          <label className="d-flex flex-column form-label w-50">
            Organizaciones aliadas
            <input
              type="text"
              name="organizations"
              value={projectData.organizations}
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
          </label>

          <label className="d-flex flex-column form-label w-50">
            Estado
            <select
              className="form-control rounded-3"
              name="status"
              value={projectData.status}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar estado</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
            {validationErrors.status && (
              <span className="error-message">{validationErrors.status}</span>
            )}
          </label>
          <br />
          <button type="submit" className="btn btn-primary btn-md w-50">
            Guardar cambios
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProject;
