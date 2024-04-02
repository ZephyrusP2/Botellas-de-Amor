import React, { useEffect, useState } from "react";
import challengeService from "../../../services/challenge";
import { useParams } from "react-router-dom";
import "../../../styles/Forms.css";
import BackButton from "../../../components/BackButton";

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
    <div className="d-flex flex-column container-fluid p-2">
      <BackButton route="/Administrar/Retos" />
      <div className="d-flex align-items-center flex-column">
        <h2 className="blue-text">
          <strong>Reto</strong>
        </h2>
        <p>{challengeData.challenge}</p>
        <h2 className="blue-text">
          <strong>Experiencia</strong>
        </h2>
        <p>{challengeData.experience}</p>
      </div>
    </div>
  );
};

export default ShowChallenge;
