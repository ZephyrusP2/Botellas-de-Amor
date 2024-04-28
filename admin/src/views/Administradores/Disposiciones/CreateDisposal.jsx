import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dispositionService from "../../../services/disposition";
import "../../../styles/Forms.css";

import BackButton from "../../../components/BackButton";

import siteService from "../../../services/site";
import SideBarAdministradores from "../../../components/Administradores/SideBar";


const CreateRegister = () => {
  document.title = "Crear disposición";
  const navigate = useNavigate();
  const [site, setSite] = useState("");
  const [bottles, setBottles] = useState("");
  const [weight, setWeight] = useState("");
  const [user, setUser] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const [puntosAcopio, setPuntosAcopio] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const validateSite = () => {
    const errors = {};
    if (!site) {
      errors.site = "Se requiere el nombre del punto de acopio";
    }
    if (!bottles) {
      errors.bottles = "Se requiere el numero de botellas";
    }
    if (!weight) {
      errors.weight = "Se requiere la cantidad de peso de las botellas";
    }
    if (!user) {
      errors.user = "Se requiere el id del usuario";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateSite()) {
      return;
    }

    const token = localStorage.getItem("token");
    const data = {
      site,
      bottles,
      weight,
      user,
    };

    try {
      const response = await dispositionService.createDisposition(data, token);
      setSite("");
      setBottles("");
      setWeight("");
      setUser("");

      navigate(`/administrar/disposiciones`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const responseData = error.response.data;
        if (responseData.error === "ID_MISMATCH") {
          alert("El ID del usuario y el ID del operador no coinciden.");
        }
      } else {
        console.error("Error creating site:", error);
      }
    }
  };

  return (
    <>
      <SideBarAdministradores />
      <div className="show-container">
        <div className="mx-4 my-4">
          <BackButton route="/administrar/disposiciones" />
        </div>

        <div className="d-flex flex-column align-items-center justify-content-center p-4 container-fluid">
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center container m-0 p-0 mx-auto"
          >
            <div className="container-register-p">
              <label className="container-register d-flex flex-column form-label">
                Punto de acopio
                <select
                  id="puntoAcopio"
                  onChange={(e) => setSite(parseInt(e.target.value))}
                  className="form-select form-control rounded-3 text-muted"
                  aria-label="Punto de acopio"
                  value={site || ""}
                  disabled={loading}
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

              <label className=" container-register d-flex flex-column form-label">
                Id del usuario
                <input
                  type="number"
                  value={user}
                  onChange={(e) =>
                    setUser(Math.max(0, parseInt(e.target.value)))
                  }
                  className="form-control rounded-3"
                />
                {validationErrors.user && (
                  <span className="error-message">{validationErrors.user}</span>
                )}
              </label>

              <label className="container-register2 d-flex flex-column form-label">
                Numero de botellas
                <input
                  type="number"
                  value={bottles}
                  onChange={(e) =>
                    setBottles(Math.max(1, parseInt(e.target.value)))
                  }
                  className="form-control rounded-3"
                />
                {validationErrors.bottles && (
                  <span className="error-message">
                    {validationErrors.bottles}
                  </span>
                )}
              </label>

              <label className="container-register3 d-flex flex-column form-label">
                Peso de las botellas
                <div className="kg-container">
                  <div className="d-block">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) =>
                        setWeight(Math.max(1, parseInt(e.target.value)))
                      }
                      className="form-control rounded-3"
                    />
                    {validationErrors.weight && (
                      <span className="error-message">
                        {validationErrors.weight}
                      </span>
                    )}
                  </div>
                  <h6 className="kg">Kg</h6>
                </div>
              </label>

              <br />
              <button type="submit" className="btn btn-primary btn-md">
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRegister;
