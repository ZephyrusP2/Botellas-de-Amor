import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import factService from "../../../services/fact";
import "../../../styles/Forms.css";

const EditFact = () => {
  document.title = "Editar dato curioso";
  const { id } = useParams();
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFact({
      ...fact,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    if (!validateFact()) return;
    try {
      await factService.updateFact(id, fact, token);
      navigate("/administrar/datos-curiosos");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    factService
      .showFact(id, token)
      .then((response) => {
        setFact(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <>
      <SideBarAdministradores />
      <div className="container-fluid p-4">
        <BackButton route="/administrar/datos-curiosos" />
        <h1 className="text-center">Editar dato curioso</h1>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center container m-0 p-0"
        >
          <label className="form-label w-50">
            Mensaje
            <input
              type="text"
              name="message"
              className="form-control rounded-3"
              value={fact.message}
              onChange={handleInputChange}
            />
            {validationErrors.message && (
              <span className="error-message">{validationErrors.message}</span>
            )}
          </label>
          <button type="submit" className="btn btn-primary btn-md w-50 mt-3">
            Edita dato curioso
          </button>
        </form>
      </div>
    </>
  );
};

export default EditFact;
