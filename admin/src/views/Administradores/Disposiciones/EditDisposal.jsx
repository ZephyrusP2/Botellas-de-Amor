import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBarOperadores from "../../../components/Operadores/SideBar";
import BackButton from "../../../components/BackButton";
import dispositionService from "../../../services/disposition";
import "../../../styles/Forms.css";
import siteService from "../../../services/site";

const EditDisposal = () => {
  document.title = "Editar disposición";
  const { id } = useParams();
  const navigate = useNavigate();

  const [dispositionData, setDispositionData] = useState({
    site: "",
    bottles: "",
    weight: "",
    user: "",
    operator: ""
  });

  const [puntosAcopio, setPuntosAcopio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    async function fetchPuntosAcopio() {
      try {
        const token = localStorage.getItem("token");
        const response = await siteService.listSite(token);
        setPuntosAcopio(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching puntos de acopio:", error);
      }
    }
    fetchPuntosAcopio();

    const getDisposition = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await dispositionService.showDisposition(id, token);
        setDispositionData(response.data);
      } catch (error) {
        console.error("Error fetching disposition:", error);
      }
    };

    getDisposition();
  }, [id]);

  const handleInputChange = (event) => {
    setDispositionData({
      ...dispositionData,
      [event.target.name]: event.target.value,
    });
  };

  const validateDisposition = () => {
    const errors = {};
    if (!dispositionData.site) {
      errors.site = "Se requiere seleccionar el punto de acopio";
    }
    if (!dispositionData.bottles) {
      errors.bottles = "Se requiere el número de botellas";
    }
    if (!dispositionData.weight) {
      errors.weight = "Se requiere la cantidad de peso de las botellas";
    }
    if (!dispositionData.user) {
      errors.user = "Se requiere el ID del usuario";
    }
    if (!dispositionData.operator) {
      errors.operator = "Se requiere el ID del operador";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateDisposition()) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await dispositionService.updateDisposition(
        id,
        dispositionData,
        token
      );
      console.log("Disposition updated successfully:", response.data);
      navigate(`/administrar/disposiciones`);
    } catch (error) {
      console.error("Error updating disposition:", error);
    }
  };

  return (
    <>
      <SideBarOperadores />
      <div className="d-flex flex-column align-items-start p-4 container-fluid">
        <BackButton route="/administrar/disposiciones" />
        <h2 className="container-fluid text-center">Editar disposición</h2>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center container m-0 p-0"
        >
          <label
            className="d-flex flex-column form-label w-50"
          >
            Punto de acopio
            <select
              onChange={handleInputChange}
              name="site"
              value={dispositionData.site}
              className="form-select form-control rounded-3"
              required
            >
              <option value="" disabled>
                {loading ? "Cargando..." : "Selecciona un punto de acopio"}
              </option>
              {puntosAcopio.map((punto) => (
                <option key={punto.id} value={punto.id}>
                  {punto.name}
                </option>
              ))}
            </select>
            {validationErrors.site && (
              <span className="error-message">{validationErrors.site}</span>
            )}
          </label>

          <label
            className="d-flex flex-column form-label w-50"
          >
            Id del usuario
            <input
              type="number"
              name="user"
              value={dispositionData.user}
              onChange={handleInputChange}
              className="form-control rounded-3"
              required
            />
            {validationErrors.user && (
              <span className="error-message">{validationErrors.user}</span>
            )}
          </label>

          <label
            className="d-flex flex-column form-label w-50"
          >
            Id del operador
            <input
              type="number"
              name="operator"
              value={dispositionData.operator}
              onChange={handleInputChange}
              className="form-control rounded-3"
              required
            />
            {validationErrors.operator && (
              <span className="error-message">{validationErrors.operator}</span>
            )}
          </label>

          <label
            className="d-flex flex-column form-label w-50"
          >
            Numero de botellas
            <input
              type="number"
              name="bottles"
              value={dispositionData.bottles}
              onChange={handleInputChange}
              className="form-control rounded-3"
              required
            />
            {validationErrors.bottles && (
              <span className="error-message">{validationErrors.bottles}</span>
            )}
          </label>

          <label
            className="d-flex flex-column form-label w-50"
          >
            Peso de las botellas
            <input
              type="number"
              name="weight"
              value={dispositionData.weight}
              onChange={handleInputChange}
              className="form-control rounded-3"
              required
            />
            {validationErrors.weight && (
              <span className="error-message">{validationErrors.weight}</span>
            )}
          </label>

          <button type="submit" className="btn btn-primary btn-md mt-3 w-50">
            Editar disposición
          </button>
        </form>
      </div>
    </>
  );
};

export default EditDisposal;