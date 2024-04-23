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
    name: "",
    address: "",
    schedules: [
      { day: "Lunes", opens: "", closes: "" },
      { day: "Martes", opens: "", closes: "" },
      { day: "Miércoles", opens: "", closes: "" },
      { day: "Jueves", opens: "", closes: "" },
      { day: "Viernes", opens: "", closes: "" },
      { day: "Sábado", opens: "", closes: "" },
      { day: "Domingo", opens: "", closes: "" }
    ]
  });

  const [validationErrors, setValidationErrors] = useState({});
  
  const validateSite = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Se requiere el nombre";
    }
    if (!data.address) {
      errors.address = "Se requiere la dirección";
    }
    if (data.schedules.some(schedule => !schedule.opens || !schedule.closes)) {
      errors.schedule = "Se requiere el horario de apertura y cierre para todos los días";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("opens") || name.startsWith("closes")) {
      const index = parseInt(name.split("_")[1]);
      const dayField = name.split("_")[0];
      const updatedSchedules = [...siteData.schedules];
      updatedSchedules[index][dayField] = value;
      setSiteData({ ...siteData, schedules: updatedSchedules });
    } else {
      setSiteData({
        ...siteData,
        [name]: event.target.type === "file" ? event.target.files[0] : value,
      });
    }
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
      formData.append("name", siteData.name);
      formData.append("address", siteData.address);
      formData.append("schedules", JSON.stringify(siteData.schedules));

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
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
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
            Dirección
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

          <div className="d-flex flex-column form-label w-50 custom-scrollbar">
            {siteData.schedules.map((schedule, index) => (
              <div key={index}>
                <label>{schedule.day}</label>
                <input
                  type="time"
                  name={`opens_${index}`}
                  value={schedule.opens}
                  onChange={handleInputChange}
                  className="form-control rounded-3"
                />
                <input
                  type="time"
                  name={`closes_${index}`}
                  value={schedule.closes}
                  onChange={handleInputChange}
                  className="form-control rounded-3"
                />
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary btn-md mt-3 w-50">
            Editar punto de acopio
          </button>
        </form>
      </div>
    </>
  );
};

export default EditSite;
