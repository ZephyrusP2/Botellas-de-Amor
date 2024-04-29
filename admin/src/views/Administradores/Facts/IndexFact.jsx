import React from "react";
import "../../../App.css";
import NavbarAdministradores from "../../../components/Administradores/Navbar";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import MyTable from "../../../components/MyTable";
import factService from "../../../services/fact";
import "../../../styles/Show.css";

const IndexFact = () => {
  document.title = "Datos curiosos";
  const token = localStorage.getItem("token");

  return (
    <>
      <SideBarAdministradores />
      <div className="show-container">
        <NavbarAdministradores />
        <MyTable
          createPath={"crear"}
          editPath={"/administrar/facts/editar/"}
          showPath={"/administrar/facts/"}
          deleteFunction={async (id) => await factService.deleteFact(id, token)}
          fetchFunction={async () => await factService.listFact(token)}
          leadingAttribute={"message"}
        />
      </div>
    </>
  );
};

export default IndexFact;
