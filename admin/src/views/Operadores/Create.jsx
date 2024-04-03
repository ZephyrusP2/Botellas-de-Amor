import "../../styles/Forms.css";

import SideBarOperadores from "../../components/Operadores/SideBar";
import NavbarOperadores from "../../components/Operadores/Navbar";

import React, { useEffect, useState } from "react";
import siteService from "../../services/site";
import { useParams } from "react-router-dom";

const Register = () => {

    document.title = "Ver punto de acopio";
    const { id } = useParams();
    const [siteData, setSiteData] = useState([]);
    const [selectedSite, setSelectedSite] = useState("");

    const [loading, setLoading] = useState(true); // Initialize loading state

    useEffect(() => {
        const getSite = async () => {
            const token = localStorage.getItem("token");
            const response = await siteService.showSite(id, token);
            setSiteData(response.data);
            setLoading(false); // Set loading to false when data is fetched
        };

        getSite();
    }, [id]);
    const handleSelectChange = (event) => {
        setSelectedSite(event.target.value);
    };

    return (
        <>
            <SideBarOperadores />
            <div className="show-container">
                <NavbarOperadores />

                <div className="d-flex flex-column align-items-center justify-content-center p-4 container-fluid">
                    <form className="d-flex flex-column align-items-center container m-0 p-0 mx-auto">
                        <div className="contianer-register-p">
                            <div className="container-register d-flex flex-column form-label">
                                <label htmlFor="puntoAcopio">Punto de acopio</label>
                                <select
                                    id="puntoAcopio"
                                    className="form-select form-control rounded-3 text-muted"
                                    aria-label="Punto de acopio"
                                    defaultValue="" // Usa defaultValue en lugar de selected
                                    disabled={loading}
                                >
                                    <option value="" disabled>
                                        {loading ? "Cargando..." : "Selecciona un punto de acopio"}
                                    </option>
                                    {puntosAcopio.map(punto => (
                                        <option key={punto.id} value={punto.id}>
                                            {punto.name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <label className="container-register d-flex flex-column form-label">
                                Codigo
                                <input
                                    className=" form-control rounded-3"
                                />

                            </label>
                            <label className="container-register2 d-flex flex-column form-label">
                                Numero de botellas
                                <input
                                    className=" form-control rounded-3"
                                />

                            </label>

                            <label className="container-register2 d-flex flex-column form-label">
                                Peso total de las botellas
                                <div className="kg-container">
                                    <input
                                        className="form-control rounded-3"
                                    />
                                    <h6 className="kg">Kg</h6>
                                </div>
                            </label>

                            <br />
                            <button type="submit" className="container-register2 btn btn-primary btn-md">
                                Confirmar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
