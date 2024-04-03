import React, { useEffect, useState } from "react";
import UserService from "../../../services/user";
import { useParams } from "react-router-dom";
import "../../../styles/Forms.css";
import BackButton from "../../../components/BackButton";

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
    <div className="d-flex flex-column container-fluid p-2">
      <BackButton route="/Administrar/Usuarios" />
      <div className="d-flex align-items-center flex-column">
        <h2 className="blue-text ">
          <strong>Nombre completo</strong>
        </h2>
        <p className="">
          {userData.name} {userData.last_name}
        </p>
        <h2 className="blue-text ">
          <strong>Fecha de nacimiento</strong>
        </h2>
        <p className="">{userData.birth_date}</p>
        <h2 className="blue-text ">
          <strong>Genero</strong>
        </h2>
        <p className="">{userData.gender}</p>
        <h2 className="blue-text ">
          <strong>Email</strong>
        </h2>
        <p className="">{userData.email}</p>
        <h2 className="blue-text ">
          <strong>Rol</strong>
        </h2>
        <p className="">{userData.role}</p>
        <h2 className="blue-text ">
          <strong>Ubicación</strong>
        </h2>
        <p className="">{userData.location}</p>
        <h2 className="blue-text ">
          <strong>Huella de carbono</strong>
        </h2>
        <p className="">{userData.carbon_footprint}</p>
      </div>
    </div>
  );
};

export default ShowUser;
