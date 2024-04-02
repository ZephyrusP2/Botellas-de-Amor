import React from "react";
import MyTable from "../../../components/MyTable";
import ChallengeService from "../../../services/challenge";
import NavbarAdministradores from "../../../components/Administradores/Navbar";
import "../../../App.css";
import "../../../styles/Show.css";

const IndexChallenge = () => {
  document.title = "Retos";
  const token = localStorage.getItem("token");

  return (
    <div className="show-container">
      <NavbarAdministradores />
      <MyTable
        createPath={"Crear"}
        editPath={"/Administrar/Retos/Editar/"}
        showPath={"/Administrar/Retos/"}
        deleteFunction={async (id) =>
          await ChallengeService.deleteChallenge(id, token)
        }
        fetchFunction={async () => await ChallengeService.listChallenge(token)}
        leadingAttribute={"challenge"}
      />
    </div>
  );
};

export default IndexChallenge;
