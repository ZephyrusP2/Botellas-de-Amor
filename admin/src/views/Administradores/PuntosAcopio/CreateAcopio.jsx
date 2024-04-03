import React, { useState } from "react";
import siteService from "../../../services/site";
import { useNavigate } from "react-router-dom";
import "../../../styles/Forms.css";
import BackButton from "../../../components/BackButton";

const CreateSite = () => {
  document.title = "Crear reto";
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [opens, setOpens] = useState("");
  const [closes, setCloses] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validateSite = () => {
    const errors = {};
    if (!image) {
      errors.image = "Se requiere poner la imagen";
    }
    if (!opens) {
      errors.opens = "Se requiere la hora de apertura";
    }
    if (!closes) {
      errors.closes = "Se requiere la hora de cierre";
    }
    if (!name) {
      errors.name = "Se requiere el nombre";
    }
    if (!address) {
      errors.address = "Se requiere la direccion";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateSite()) {
      return;
    }

    const token = localStorage.getItem("token");
    const data = {
      image,
      opens,
      closes,
      name,
      address,
    };

    try {
      const response = await siteService.createSite(data, token);
      console.log("site created:", response);
      setImage("");
      setOpens("");
      setCloses("");
      setAddress("");
      setName("");

      navigate(`/Administrar/Puntos-Acopio`);
    } catch (error) {
      console.error("Error creating site:", error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-start p-4 container-fluid">
      <BackButton route="/Administrar/Puntos-Acopio" />
      <h1>Crear punto de acopio</h1>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column container m-0 p-0"
      >
        <label className="d-flex flex-column form-label w-50">
          Imagen
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-control rounded-3"
          />
          {validationErrors.image && (
            <span className="error-message">{validationErrors.image}</span>
          )}
        </label>
        <label className="d-flex flex-column form-label w-50">
          Hora de apertura
          <input
            type="time"
            value={opens}
            onChange={(e) => setOpens(e.target.value)}
            className="form-control rounded-3"
          />
          {validationErrors.opens && (
            <span className="error-message">{validationErrors.opens}</span>
          )}
        </label>

        <label className="d-flex flex-column form-label w-50">
          Hora de cierre
          <input
            type="time"
            value={closes}
            onChange={(e) => setCloses(e.target.value)}
            className="form-control rounded-3"
          />
          {validationErrors.closes && (
            <span className="error-message">{validationErrors.closes}</span>
          )}
        </label>

        <label className="d-flex flex-column form-label w-50">
          Nombre
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control rounded-3"
          />
          {validationErrors.name && (
            <span className="error-message">{validationErrors.name}</span>
          )}
        </label>
        <label className="d-flex flex-column form-label w-50">
          Dirección
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control rounded-3"
          />
          {validationErrors.address && (
            <span className="error-message">{validationErrors.address}</span>
          )}
        </label>

        <br />
        <button type="submit" className="btn btn-primary btn-md w-50">
          Crear
        </button>
      </form>
    </div>
  );
};

export default CreateSite;
