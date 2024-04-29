import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import challengeService from "../../../services/challenge";
import "../../../styles/Forms.css";

const EditChallenge = () => {
  document.title = "Editar reto";
  const { id } = useParams();
  const navigate = useNavigate();

  const [challengeData, setChallengeData] = useState({
    id: "",
    challenge: "",
    experience: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const validateChallenge = (data) => {
    const errors = {};
    if (!data.challenge) {
      errors.challenge = "Se requiere poner el reto";
    }
    if (!data.experience) {
      errors.experience = "La experiencia debe ser un numero entero";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (event) => {
    setChallengeData({
      ...challengeData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateChallenge(challengeData)) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await challengeService.updateChallenge(
        id,
        challengeData,
        token
      );
      navigate(`/administrar/retos`);
    } catch (error) {
      console.error("Error updating challenge:", error);
    }
  };

  useEffect(() => {
    const getChallenge = async () => {
      const token = localStorage.getItem("token");
      const response = await challengeService.showChallenge(id, token);
      setChallengeData(response.data);
    };

    getChallenge();
  }, [id]);

  return (
    <>
      <SideBarAdministradores />
      <div className="d-flex flex-column align-items-start p-4 container-fluid">
        <BackButton route="/administrar/retos" />
        <h2 className="container-fluid text-center">Editar reto</h2>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center container m-0 p-0"
        >
          <label
            htmlFor="challenge"
            className="d-flex flex-column form-label w-50"
          >
            Reto
            <input
              type="text"
              name="challenge"
              id="challenge"
              value={challengeData.challenge}
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
            {validationErrors.challenge && (
              <span className="error-message">
                {validationErrors.challenge}
              </span>
            )}
          </label>

          <label
            htmlFor="experience"
            className="d-flex flex-column form-label w-50"
          >
            Experiencia
            <input
              type="number"
              name="experience"
              id="experience"
              value={challengeData.experience}
              onChange={handleInputChange}
              className="form-control rounded-3"
            />
            {validationErrors.experience && (
              <span className="error-message">
                {validationErrors.experience}
              </span>
            )}
          </label>

          <button type="submit" className="btn btn-primary btn-md mt-3 w-50">
            Editar reto
          </button>
        </form>
      </div>
    </>
  );
};

export default EditChallenge;
