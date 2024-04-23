import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import siteService from "../../../services/site";
import "../../../styles/Forms.css";
import { useForm } from 'react-hook-form';

const CreateSite = () => {
  document.title = "crear reto";
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [schedules, setSchedules] = useState([
    { day: "Lunes", opens: "", closes: "" },
    { day: "Martes", opens: "", closes: "" },
    { day: "Miércoles", opens: "", closes: "" },
    { day: "Jueves", opens: "", closes: "" },
    { day: "Viernes", opens: "", closes: "" },
    { day: "Sábado", opens: "", closes: "" },
    { day: "Domingo", opens: "", closes: "" }
  ]);
  const { register, formState: { errors }, handleSubmit: validateAndSubmit } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("schedules", JSON.stringify(schedules));

    try {
      const response = await siteService.createSite(formData, token);
      console.log("site created:", response);
      setImage(null);
      setName("");
      setAddress("");
      setSchedules([]);

      navigate(`/administrar/puntos-acopio`);
    } catch (error) {
      console.error("Error creating site:", error);
    }
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index][field] = value;
    setSchedules(updatedSchedules);
  };

  return (
    <>
      <SideBarAdministradores />
      
      <div className="d-flex flex-column align-items-start p-4 container-fluid">
        <BackButton route="/administrar/puntos-acopio" />
        <h1 className="container-fluid text-center">Crear punto de acopio</h1>
        <div className="form-container">

        <form
          onSubmit={validateAndSubmit(onSubmit)}
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
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
              className="form-control rounded-3"
            />
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: "20%" }} />}
            {errors.image && (
              <span className="error-message">Se requiere poner la imagen</span>
            )}
          </label>

          <label className="d-flex flex-column form-label w-50">
            Nombre
            <input
              type="text"
              {...register("name", { required: true })}
              className="form-control rounded-3"
            />
            {errors.name && (
              <span className="error-message">Se requiere el nombre</span>
            )}
          </label>
          <label className="d-flex flex-column form-label w-50">
            Dirección
            <input
              type="text"
              {...register("address", { required: true })}
              className="form-control rounded-3"
            />
            {errors.address && (
              <span className="error-message">Se requiere la dirección</span>
            )}
          </label>

          <div className="d-flex flex-column form-label w-50 custom-scrollbar">
            {schedules.map((schedule, index) => (
              <div key={index}>
                <label>{schedule.day}</label>
                <input
                  type="time"
                  {...register(`opens.${index}`, { required: true })}
                  value={schedule.opens}
                  onChange={(e) => handleScheduleChange(index, "opens", e.target.value)}
                  className="form-control rounded-3"
                />
                {errors.opens && errors.opens[index] && (
                  <span className="error-message">Se requiere el horario de apertura para {schedule.day}</span>
                )}
                <input
                  type="time"
                  {...register(`closes.${index}`, { required: true })}
                  value={schedule.closes}
                  onChange={(e) => handleScheduleChange(index, "closes", e.target.value)}
                  className="form-control rounded-3"
                />
                {errors.closes && errors.closes[index] && (
                  <span className="error-message">Se requiere el horario de cierre para {schedule.day}</span>
                )}
              </div>
            ))}
          </div>

          <br />
          <button type="submit" className="btn btn-primary btn-md w-50">
            crear
          </button>
        </form>
      </div>

      </div>
    </>
  );
};

export default CreateSite;
