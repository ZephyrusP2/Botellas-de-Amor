import React, { useEffect, useState } from "react";
import challengeService from "../services/challenge";
import { useParams } from "react-router-dom";
import "../styles/Forms.css";
import BackButton from "../components/BackButton";

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
    <div className="d-flex flex-column container p-2">
      <BackButton route="/admin/challenges" />
      <p className="blue-text">
        <strong>Reto</strong>
      </p>
      <p>{challengeData.challenge}</p>
      <p className="blue-text">
        <strong>Experiencia</strong>
      </p>
      <p>{challengeData.experience}</p>
    </div>
  );
};

export default ShowChallenge;
