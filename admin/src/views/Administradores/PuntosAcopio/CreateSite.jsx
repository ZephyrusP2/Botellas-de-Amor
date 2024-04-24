import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import siteService from "../../../services/site";
import "../../../styles/Forms.css";
import { useForm } from "react-hook-form";

const CreateSite = () => {
  document.title = "crear reto";
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [schedules, setSchedules] = useState([
    { day: "Lunes", opens: "", closes: "", enabled: false },
    { day: "Martes", opens: "", closes: "", enabled: false },
    { day: "Miércoles", opens: "", closes: "", enabled: false },
    { day: "Jueves", opens: "", closes: "", enabled: false },
    { day: "Viernes", opens: "", closes: "", enabled: false },
    { day: "Sábado", opens: "", closes: "", enabled: false },
    { day: "Domingo", opens: "", closes: "", enabled: false },
  ]);
  const {
    register,
    formState: { errors },
    handleSubmit: validateAndSubmit,
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("address", data.address);

    // Filtrar solo los días habilitados con horarios definidos
    const filteredSchedules = schedules
      .filter(
        (schedule) =>
          schedule.enabled && schedule.opens !== "" && schedule.closes !== ""
      )
      .map((schedule) => ({
        day: schedule.day,
        opens: schedule.opens,
        closes: schedule.closes,
      }));

    formData.append("schedules", JSON.stringify(filteredSchedules));

    try {
      const response = await siteService.createSite(formData, token);
      setImage(null);
      setName("");
      setAddress("");
      setSchedules([]);

      navigate(`/administrar/puntos-acopio`);
    } catch (error) {
      console.error("Error creating site:", error);
    }
  };

  const toggleDay = (index) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index].enabled = !updatedSchedules[index].enabled;
    setSchedules(updatedSchedules);
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
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "20%" }}
                />
              )}
              {errors.image && (
                <span className="error-message">
                  Se requiere poner la imagen
                </span>
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
                  <label>
                    <input
                      type="checkbox"
                      checked={schedule.enabled}
                      onChange={() => toggleDay(index)}
                    />
                    {schedule.day}
                  </label>
                  {schedule.enabled && (
                    <>
                      <input
                        type="time"
                        {...register(`opens.${index}`)}
                        value={schedule.opens}
                        onChange={(e) =>
                          handleScheduleChange(index, "opens", e.target.value)
                        }
                        className="form-control rounded-3"
                      />
                      <input
                        type="time"
                        {...register(`closes.${index}`)}
                        value={schedule.closes}
                        onChange={(e) =>
                          handleScheduleChange(index, "closes", e.target.value)
                        }
                        className="form-control rounded-3"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>

            <br />
            <button type="submit" className="btn btn-primary btn-md w-50">
              Crear
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateSite;
