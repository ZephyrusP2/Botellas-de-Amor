import React from "react";
import "../../../App.css";
import NavbarAdministradores from "../../../components/Administradores/Navbar";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import MyTable from "../../../components/MyTable";
import ChallengeService from "../../../services/challenge";
import "../../../styles/Show.css";

const IndexChallenge = () => {
  document.title = "Retos";
  const token = localStorage.getItem("token");

  return (
    <>
      <SideBarAdministradores />
      <div className="show-container">
        <NavbarAdministradores />
        <MyTable
          createPath={"crear"}
          editPath={"/administrar/retos/editar/"}
          showPath={"/administrar/retos/"}
          deleteFunction={async (id) =>
            await ChallengeService.deleteChallenge(id, token)
          }
          fetchFunction={async () =>
            await ChallengeService.listChallenge(token)
          }
          leadingAttribute={"challenge"}
        />
      </div>
    </>
  );
};

export default IndexChallenge;
