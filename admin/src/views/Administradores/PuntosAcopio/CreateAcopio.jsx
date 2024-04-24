import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import siteService from "../../../services/site";
import "../../../styles/Forms.css";
import { useForm } from 'react-hook-form'

const CreateSite = () => {
  document.title = "crear reto";
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [opens, setOpens] = useState("");
  const [closes, setCloses] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const { register, formState: { errors }, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

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
      errors.address = "Se requiere la dirección";
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
    const formData = new FormData();
    formData.append("image", image);
    formData.append("opens", opens);
    formData.append("closes", closes);
    formData.append("name", name);
    formData.append("address", address);
  
    try {
      const response = await siteService.createSite(formData, token);
      console.log("site created:", response);
      setImage(null);
      setOpens("");
      setCloses("");
      setAddress("");
      setName("");
  
      navigate(`/administrar/puntos-acopio`);
    } catch (error) {
      console.error("Error creating site:", error);
    }
  };
  
  return (
    <>
      <SideBarAdministradores />
      <div className="d-flex flex-column align-items-start p-4 container-fluid">
        <BackButton route="/administrar/puntos-acopio" />
        <h1 className="container-fluid text-center">crear punto de acopio</h1>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center container m-0 p-0"
        >
          <label className="d-flex flex-column form-label w-50">
            Imagen
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              {...register("image", { required: true })}
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0])); // Mostrar vista previa
              }}
              className="form-control rounded-3"
            />
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: "20%" }} />} {/* Mostrar vista previa de la imagen */}
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
            crear
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateSite;
