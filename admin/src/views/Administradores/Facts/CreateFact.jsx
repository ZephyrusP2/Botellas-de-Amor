import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import factService from "../../../services/fact";
import "../../../styles/Forms.css";

const CreateFact = () => {
  document.title = "Crear dato curioso";
  const navigate = useNavigate();
  const [fact, setFact] = useState({
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const validateFact = () => {
    const errors = {};
    if (!fact.message) {
      errors.message = "Se requiere el mensaje del dato curioso";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    if (!validateFact()) return;
    try {
      await factService.createFact(fact, token);
      navigate("/administrar/datos-curiosos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SideBarAdministradores />
      <div className="d-flex flex-column align-items-start p-4 container-fluid overflow-auto">
        <BackButton route="/administrar/datos-curiosos" />
        <h1 className="container-fluid text-center">Crear dato curioso</h1>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center container m-0 p-0"
        >
          <label className="d-flex flex-column form-label w-50">
            Mensaje
            <input
              type="text"
              className="form-control rounded-3"
              onChange={(event) =>
                setFact({ ...fact, message: event.target.value })
              }
            />
            {validationErrors.message && (
              <span className="error-message">{validationErrors.message}</span>
            )}
          </label>
          <button type="submit" className="btn btn-primary btn-md w-50 mt-3">
            Crear
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateFact;
