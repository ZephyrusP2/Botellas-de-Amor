import React, { useEffect, useState } from "react";
import challengeService from "../../../services/challenge";
import { useParams } from "react-router-dom";
import "../../../styles/Forms.css";
import BackButton from "../../../components/BackButton";
import SideBarAdministradores from "../../../components/Administradores/SideBar";

const ShowChallenge = () => {
  document.title = "Ver reto";
  const { id } = useParams();
  const [challengeData, setChallengeData] = useState({});

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
      <div className="d-flex flex-column container-fluid p-2">
        <BackButton route="/Administrar/Retos" />
        <div className="d-flex align-items-center flex-column">
          <h2 className="blue-text display-5">
            <strong>Reto</strong>
          </h2>
          <p className="display-6">{challengeData.challenge}</p>
          <h2 className="blue-text display-5">
            <strong>Experiencia</strong>
          </h2>
          <p className="display-6">{challengeData.experience}</p>
        </div>
      </div>
    </>
  );
};

export default ShowChallenge;
