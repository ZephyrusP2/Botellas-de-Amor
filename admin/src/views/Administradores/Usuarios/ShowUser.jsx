import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import UserService from "../../../services/user";
import "../../../styles/Forms.css";

const ShowUser = () => {
  document.title = "Ver usuario";
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      const response = await UserService.showUser(id, token);
      setUserData(response.data);
    };

    getUser();
  }, [id]);

  return (
    <>
      <SideBarAdministradores />
      <div className="d-flex flex-column container-fluid p-2">
        <BackButton route="/administrar/usuarios" />

        <div className="d-flex align-items-center flex-column mt-1">
          <h2 className="blue-text display-6 small-text">
            <strong>Nombre completo</strong>
          </h2>
          <p className="display-6 small-text ">
            {userData.name} {userData.last_name}
          </p>
          <h2 className="blue-text display-6 small-text">
            <strong>Fecha de nacimiento</strong>
          </h2>
          <p className="display-6 small-text">{userData.birth_date}</p>
          <h2 className="blue-text display-6 small-text">
            <strong>Genero</strong>
          </h2>
          <p className="display-6 small-text">{userData.gender}</p>
          <h2 className="blue-text display-6 small-text">
            <strong>Email</strong>
          </h2>
          <p className="display-6 small-text">{userData.email}</p>
          <h2 className="blue-text display-6 small-text">
            <strong>Rol</strong>
          </h2>
          <p className="display-6 small-text">{userData.role}</p>
          <h2 className="blue-text display-6 small-text">
            <strong>Ubicación</strong>
          </h2>
          <p className="display-6 small-text">{userData.location}</p>
          <h2 className="blue-text display-6 small-text">
            <strong>Huella de carbono</strong>
          </h2>
          <p className="display-6 small-text">{userData.carbon_footprint}</p>
        </div>
      </div>
    </>
  );
};

export default ShowUser;
