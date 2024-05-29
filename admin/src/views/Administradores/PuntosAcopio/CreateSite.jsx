import React, { useState, useRef, useEffect } from "react";
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
  const [imagePreview, setImagePreview] = useState(null);
  const [newDay, setNewDay] = useState("");
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const latRef = useRef(null);
  const lngRef = useRef(null);
  const [placeName, setPlaceName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [siteData, setSiteData] = useState({
    id: "",
    image: "",
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    status: "Activo",
    schedules: [],
  });

  const {
    register,
    formState: { errors },
    handleSubmit: validateAndSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("address", placeName); // Usar placeName en lugar de data.address
    formData.append("latitude", latitude.toString()); // Convertir a string
    formData.append("longitude", longitude.toString()); // Convertir a string
    formData.append("status", data.status === "Activo");

    const filteredSchedules = siteData.schedules
      .filter(
        (schedule) =>
          schedule.enabled && schedule.opens !== "" && schedule.closes !== "",
      )
      .map((schedule) => ({
        day: schedule.day,
        opens: schedule.opens,
        closes: schedule.closes,
      }));

    formData.append("schedules", JSON.stringify(filteredSchedules));

    try {
      console.log("Enviando datos:", {
        image,
        name: data.name,
        address: placeName,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        status: data.status,
        schedules: filteredSchedules,
      });

      await siteService.createSite(formData, token);

      setSiteData({
        id: "",
        image: "",
        name: "",
        address: "",
        latitude: "",
        longitude: "",
        status: "Activo",
        schedules: [],
      });
      setImage(null);
      setImagePreview(null);
      setNewDay("");

      navigate(`/administrar/puntos-acopio`);
    } catch (error) {
      console.error(
        "Error creating site:",
        error.response?.data || error.message,
      );
      alert(
        "Error creating site: " +
          (error.response?.data.message || error.message),
      );
    }
  };

  const addDay = () => {
    if (!newDay) {
      alert("Por favor, seleccione un día para agregar.");
      return;
    }

    const newSchedule = { day: newDay, opens: "", closes: "" };
    setSiteData({
      ...siteData,
      schedules: [...siteData.schedules, newSchedule],
    });
    setNewDay("");
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
          (day) => !siteData.schedules.some((schedule) => schedule.day === day),
        )
      : [];

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    if (name.startsWith("opens") || name.startsWith("closes")) {
      const index = parseInt(name.split("_")[1]);
      const dayField = name.split("_")[0];
      const updatedSchedules = [...siteData.schedules];
      updatedSchedules[index][dayField] = value;
      setSiteData({ ...siteData, schedules: updatedSchedules });
    } else {
      setSiteData({
        ...siteData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    const options = {
      fields: ["address_components", "geometry", "icon", "name"],
      types: ["establishment"],
    };

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options,
    );

    autoCompleteRef.current.addListener("place_changed", () => {
      const place = autoCompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setPlaceName(place.name);
        setLatitude(lat);
        setLongitude(lng);

        // Actualizar el estado siteData con los nuevos valores
        setSiteData({
          ...siteData,
          address: place.formatted_address,
          latitude: lat,
          longitude: lng,
        });

        console.log("Nombre del lugar:", place.name);
        console.log("Latitud:", lat);
        console.log("Longitud:", lng);
      }
    });
  }, []);
  useEffect(() => {
    setSiteData((prevData) => ({
      ...prevData,
      address: placeName,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    }));
  }, [placeName, latitude, longitude]);

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
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
            {errors.name && (
              <span className="error-message">Se requiere el nombre</span>
            )}
          </label>
          <label className="d-flex flex-column form-label w-50">
            Dirección
            <input
              ref={inputRef}
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
            {errors.address && (
              <span className="error-message">Se requiere la dirección</span>
            )}
          </label>
          {/* <label className="d-flex flex-column form-label w-50">
            Latitud {latRef.current}

            <input
              type="text"
              {...register("latitude", { required: true })}
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
            {errors.latitude && (
              <span className="error-message">Se requiere la latitud</span>
            )}
          </label>
          <label className="d-flex flex-column form-label w-50">
            Longitud {lngRef.current}
            <input
              type="text"
              {...register("longitude", { required: true })}
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
            {errors.longitude && (
              <span className="error-message">Se requiere la longitud</span>
            )}
          </label> */}
          <label className="d-flex flex-column form-label w-50">
            Estado
            <select
              name="status"
              {...register("status", { required: true })}
              value={siteData.status}
              onChange={handleInputChange}
              className="form-control rounded-3"
            >
              <option value="">Seleccione un estado</option>{" "}
              {/* Opción por defecto */}
              <option value="Activo">Activo</option>
              <option value="No Activo">No Activo</option>
            </select>
            {errors.status && (
              <span className="error-message">
                Se requiere seleccionar el estado
              </span>
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
