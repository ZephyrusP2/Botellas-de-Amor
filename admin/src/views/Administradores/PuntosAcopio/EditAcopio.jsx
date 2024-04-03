import React, { useEffect, useState } from "react";
import siteService from "../../../services/site";
import { useParams, useNavigate } from "react-router-dom";
import "../../../styles/Forms.css";
import BackButton from "../../../components/BackButton";

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
    if (!data.image) {
      errors.image = "Se requiere poner la imagen";
    }
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
      errors.opens = "Se requiere la direccion";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (event) => {
    setSiteData({
      ...siteData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateSite(siteData)) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await siteService.updateSite(id, siteData, token);
      console.log("Site updated successfully:", response.data);
      navigate(`/Administrar/Puntos-Acopio`);
    } catch (error) {
      console.error("Error updating site:", error);
    }
  };

  useEffect(() => {
    const getSite = async () => {
      const token = localStorage.getItem("token");
      const response = await siteService.showSite(id, token);
      setSiteData(response.data);
    };

    getSite();
  }, [id]);

  return (
    <div className="d-flex flex-column align-items-start p-4 container-fluid">
      <BackButton route="/Administrar/Retos" />
      <h2>Editar punto de acopio</h2>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column container m-0 p-0"
      >
        <label htmlFor="image" className="d-flex flex-column form-label w-50">
          Imagen
          <input
            type="text"
            name="image"
            id="image"
            value={siteData.image}
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
        <label htmlFor="closes" className="d-flex flex-column form-label w-50">
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

        <label htmlFor="address" className="d-flex flex-column form-label w-50">
          Nombre
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
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditSite;
