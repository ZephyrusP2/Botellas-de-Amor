import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import dispositionService from "../../../services/disposition";
import siteService from "../../../services/site";
import userService from "../../../services/user";
import "../../../styles/Forms.css";

const ShowDisposal = () => {
  document.title = "Ver disposición";
  const { id } = useParams();
  const [dispositionData, setDispositionData] = useState({});
  const [sites, setSites] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getDisposition = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await dispositionService.showDisposition(id, token);
        setDispositionData(response.data);
      } catch (error) {
        console.error("Error fetching disposition:", error);
      }
    };
    async function fetchSites() {
      try {
        const token = localStorage.getItem("token");
        const response = await siteService.listSite(token);
        setSites(response.data);
      } catch (error) {
        console.error("Error fetching puntos de acopio:", error);
      }
    }
    async function fetchUsers() {
      try {
        const token = localStorage.getItem("token");
        const response = await userService.listUser(token);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    }
    fetchSites();
    getDisposition();
    fetchUsers();
  }, [id]);

  const findUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const operatorOrUser = findUserById(dispositionData.user);

  const findSiteById = (siteId) => {
    return sites.find((site) => site.id === siteId);
  };

  const site = findSiteById(dispositionData.site);

  return (
    <>
      <SideBarAdministradores />
      <div className="d-flex flex-column container-fluid p-2">
        <BackButton route="/administrar/disposiciones" />
        <div className="d-flex align-items-center flex-column mt-5">
          <h2 className="blue-text display-5 small-text">
            <strong>Punto de acopio</strong>
          </h2>
          <p className="display-6 small-text">
            {site ? site.name : "No se encontro el punto de acopio"}
          </p>
          <h2 className="blue-text display-5 small-text">
            <strong>Numero de botellas</strong>
          </h2>
          <p className="display-6 small-text">{dispositionData.bottles}</p>
          <h2 className="blue-text display-5 small-text">
            <strong>Peso de las botellas</strong>
          </h2>
          <p className="display-6 small-text">{dispositionData.weight}</p>
          <h2 className="blue-text display-5 small-text">
            <strong>Usuario</strong>
          </h2>
          <p className="display-6 small-text">
            {operatorOrUser ? operatorOrUser.name : "No se encontro el usuario"}
          </p>
          <h2 className="blue-text display-5 small-text">
            <strong>Operador</strong>
          </h2>
          <p className="display-6 small-text">
            {operatorOrUser
              ? operatorOrUser.name
              : "No se encontro el operador"}
          </p>
        </div>
      </div>
    </>
  );
};

export default ShowDisposal;
