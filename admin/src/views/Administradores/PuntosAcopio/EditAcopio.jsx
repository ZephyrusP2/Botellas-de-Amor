import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import siteService from "../../../services/site";
import "../../../styles/Forms.css";

const EditSite = () => {
  document.title = "Editar punto de acopio";
  const { id } = useParams();
  const navigate = useNavigate();

  const [siteData, setSiteData] = useState({
    id: "",
    image: "",
    opens: "",
    closes: "",
    name: "",
    address: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const validateSite = (data) => {
    const errors = {};
    if (!data.opens) {
      errors.opens = "Se requiere la hora de apertura";
    }
    if (!data.closes) {
      errors.closes = "Se requiere la hora de cierre";
    }
    if (!data.name) {
      errors.name = "Se requiere el nombre";
    }
    if (!data.address) {
      errors.address = "Se requiere la direccion"; // Corrected typo in property name
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (event) => {
    setSiteData({
      ...siteData,
      [event.target.name]:
        event.target.type === "file"
          ? event.target.files[0]
          : event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateSite(siteData)) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      if (siteData.image) {
        formData.append("image", siteData.image);
      }
      formData.append("opens", siteData.opens);
      formData.append("closes", siteData.closes);
      formData.append("name", siteData.name);
      formData.append("address", siteData.address);

      await siteService.updateSite(id, formData, token);
      navigate(`/administrar/puntos-acopio`);
    } catch (error) {
      console.error("Error updating site:", error);
    }
  };

  useEffect(() => {
    const getSite = async () => {
      const token = localStorage.getItem("token");
      const response = await siteService.showSite(id, token);
      response.data.image = null;
      setSiteData(response.data);
    };

    getSite();
  }, [id]);

  return (
    <>
      <SideBarAdministradores />
      <div className="d-flex flex-column align-items-start p-4 container-fluid">
        <BackButton route="/administrar/puntos-acopio" />
        <h2 className="container-fluid text-center">Editar punto de acopio</h2>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center container m-0 p-0"
        >
          <label htmlFor="image" className="d-flex flex-column form-label w-50">
            Imagen
            <input
              type="file" // Changed type to file
              name="image"
              id="image"
              accept="image/*"
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
            {validationErrors.image && (
              <span className="error-message">{validationErrors.image}</span>
            )}
          </label>

          <label htmlFor="opens" className="d-flex flex-column form-label w-50">
            Hora de apertura
            <input
              type="time"
              name="opens"
              id="opens"
              value={siteData.opens}
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
            {validationErrors.opens && (
              <span className="error-message">{validationErrors.opens}</span>
            )}
          </label>
          <label
            htmlFor="closes"
            className="d-flex flex-column form-label w-50"
          >
            Hora de cierre
            <input
              type="time"
              name="closes"
              id="closes"
              value={siteData.closes}
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
            {validationErrors.closes && (
              <span className="error-message">{validationErrors.closes}</span>
            )}
          </label>

          <label htmlFor="name" className="d-flex flex-column form-label w-50">
            Nombre
            <input
              type="text"
              name="name"
              id="name"
              value={siteData.name}
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
            {validationErrors.name && (
              <span className="error-message">{validationErrors.name}</span>
            )}
          </label>

          <label
            htmlFor="address"
            className="d-flex flex-column form-label w-50"
          >
            Direccion
            <input
              type="text"
              name="address"
              id="address"
              value={siteData.address}
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
            {validationErrors.address && (
              <span className="error-message">{validationErrors.address}</span>
            )}
          </label>

          <button type="submit" className="btn btn-primary btn-md mt-3 w-50">
            Editar punto de acopio
          </button>
        </form>
      </div>
    </>
  );
};

export default EditSite;
