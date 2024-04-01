import React, { useState } from "react";
import challengeService from "../services/challenge";

const CreateChallenge = () => {
  document.title = "Crear reto";
  const [challenge, setChallenge] = useState("");
  const [experience, setExperience] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      challenge,
      experience: parseInt(experience),
    };

    try {
      const response = await challengeService.createChallenge(data, token);
      console.log("Challenge created:", response);
    } catch (error) {
      console.error("Error creating challenge:", error);
    }
    setChallenge("");
    setExperience("");
  };

  return (
    <div>
      <h1>Create Challenge</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Challenge:
          <input
            type="text"
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
          />
        </label>
        <br />
        <label>
          Experience:
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" onClick={() => handleSubmit()}>
          Crear
        </button>
      </form>
    </div>
  );
};

export default CreateChallenge;
