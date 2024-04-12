import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import challengeService from "../../../services/challenge";
import "../../../styles/Forms.css";

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
        <BackButton route="/administrar/retos" />
        <div className="d-flex align-items-center flex-column mt-5">
          <h2 className="blue-text display-5 small-text">
            <strong>Reto</strong>
          </h2>
          <p className="display-6 small-text">{challengeData.challenge}</p>
          <h2 className="blue-text display-5 small-text">
            <strong>Experiencia</strong>
          </h2>
          <p className="display-6 small-text">{challengeData.experience}</p>
        </div>
      </div>
    </>
  );
};

export default ShowChallenge;
