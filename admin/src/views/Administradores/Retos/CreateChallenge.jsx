import React, { useState } from "react";
import challengeService from "../../../services/challenge";
import { useNavigate } from "react-router-dom";
import "../../../styles/Forms.css";
import BackButton from "../../../components/BackButton";
import SideBarAdministradores from "../../../components/Administradores/SideBar";

const CreateChallenge = () => {
  document.title = "Crear reto";
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState("");
  const [experience, setExperience] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validateChallenge = () => {
    const errors = {};
    if (!challenge) {
      errors.challenge = "Se requiere poner el reto";
    }
    if (!experience || isNaN(parseInt(experience))) {
      errors.experience = "La experiencia debe ser un numero entero";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateChallenge()) {
      return;
    }

    const token = localStorage.getItem("token");
    const data = {
      challenge,
      experience: parseInt(experience),
    };

    try {
      const response = await challengeService.createChallenge(data, token);
      console.log("Challenge created:", response);
      setChallenge("");
      setExperience("");
      navigate(`/Administrar/Retos`);
    } catch (error) {
      console.error("Error creating challenge:", error);
    }
  };

  return (
    <>
      <SideBarAdministradores />
      <div className="d-flex flex-column align-items-start p-4 container-fluid">
        <BackButton route="/Administrar/Retos" />
        <h1 className="container-fluid text-center">Crear reto</h1>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center container m-0 p-0"
        >
          <label className="d-flex flex-column form-label w-50">
            Reto
            <input
              type="text"
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              className="form-control rounded-3"
            />
            {validationErrors.challenge && (
              <span className="error-message">
                {validationErrors.challenge}
              </span>
            )}
          </label>
          <label className="d-flex flex-column form-label w-50">
            Experiencia
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="form-control rounded-3"
            />
            {validationErrors.experience && (
              <span className="error-message">
                {validationErrors.experience}
              </span>
            )}
          </label>
          <br />
          <button type="submit" className="btn btn-primary btn-md w-50">
            Crear
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateChallenge;
