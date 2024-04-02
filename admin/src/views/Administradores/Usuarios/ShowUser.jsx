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
        <h2 className="blue-text display-5">
          <strong>Nombre completo</strong>
        </h2>
        <p className="display-6">
          {userData.name} {userData.last_name}
        </p>
        <h2 className="blue-text display-5">
          <strong>Fecha de nacimiento</strong>
        </h2>
        <p className="display-6">{userData.birth_date}</p>
        <h2 className="blue-text display-5">
          <strong>Genero</strong>
        </h2>
        <p className="display-6">{userData.gender}</p>
        <h2 className="blue-text display-5">
          <strong>Email</strong>
        </h2>
        <p className="display-6">{userData.email}</p>
      </div>
    </div>
  );
};

export default ShowUser;
