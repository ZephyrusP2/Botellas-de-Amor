import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import siteService from "../../../services/site";
import "../../../styles/Forms.css";
import { useForm } from "react-hook-form";

const CreateSite = () => {
  document.title = "Crear punto de acopio";
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [siteData, setSiteData] = useState({
    id: "",
    image: "",
    name: "",
    address: "",
    schedules: [],
  });
  const {
    register,
    formState: { errors },
    handleSubmit: validateAndSubmit,
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [newDay, setNewDay] = useState(""); // Estado para el nuevo día seleccionado

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

  const addDay = () => {
    // Verificar si se ha seleccionado un nuevo día
    if (!newDay) {
      alert("Por favor, seleccione un día para agregar.");
      return;
    }

    // Agregar el nuevo día con horarios vacíos
    const newSchedule = { day: newDay, opens: "", closes: "" };
    setSiteData({
      ...siteData,
      schedules: [...siteData.schedules, newSchedule],
    });
    setNewDay(""); // Limpiar el estado del nuevo día después de agregarlo
  };

  const availableDays =
    siteData.schedules.length < 7
      ? [
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
          "Domingo",
        ].filter(
          (day) => !siteData.schedules.some((schedule) => schedule.day === day)
        )
      : [];

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

  return (
    <>
      <SideBarAdministradores />

      <div className="d-flex flex-column align-items-start p-4 container-fluid">
        <BackButton route="/administrar/puntos-acopio" />
        <h2 className="container-fluid text-center">Crear punto de acopio</h2>
        <form
          onSubmit={validateAndSubmit(onSubmit)}
          className="d-flex flex-column align-items-center container m-0 p-0"
        >
          <label htmlFor="image" className="d-flex flex-column form-label w-50">
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
            {siteData.schedules.map((schedule, index) => (
              <div key={index}>
                <label>{schedule.day}</label>
                <input
                  type="time"
                  name={`opens_${index}`}
                  value={schedule.opens}
                  onChange={handleInputChange}
                  className="form-control rounded-3 m-1"
                />
                <input
                  type="time"
                  name={`closes_${index}`}
                  value={schedule.closes}
                  onChange={handleInputChange}
                  className="form-control rounded-3 m-1"
                />
              </div>
            ))}
          </div>
          {/* Lista desplegable para seleccionar el nuevo día */}
          <label
            htmlFor="newDay"
            className="d-flex flex-column form-label w-50"
          >
            Nuevo Día
            <select
              name="newDay"
              id="newDay"
              value={newDay}
              onChange={(event) => setNewDay(event.target.value)}
              className="form-control rounded-3"
            >
              <option value="">Seleccione un día</option>
              {availableDays.map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={addDay}
            className="btn btn-secondary btn-md mt-3 float-start"
          >
            Agregar día
          </button>

          <button type="submit" className="btn btn-primary btn-md mt-3 w-50">
            Crear punto de acopio
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateSite;
