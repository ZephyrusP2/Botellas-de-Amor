import React from "react";
import MyTable from "../../../components/MyTable";
import SiteService from "../../../services/site";
import NavbarAdministradores from "../../../components/Administradores/Navbar";
import "../../../App.css";
import "../../../styles/Show.css";
import SideBarAdministradores from "../../../components/Administradores/SideBar";

const IndexSite = () => {
  document.title = "Acopios";
  const token = localStorage.getItem("token");

  return (
    <>
      <SideBarAdministradores />
      <div className="show-container">
        <NavbarAdministradores />
        <MyTable
          createPath={"Crear"}
          editPath={"/Administrar/Puntos-Acopio/Editar/"}
          showPath={"/Administrar/Puntos-Acopio/"}
          deleteFunction={async (id) => await SiteService.deleteSite(id, token)}
          fetchFunction={async () => await SiteService.listSite(token)}
          leadingAttribute={"name"}
        />
      </div>
    </>
  );
};

export default IndexSite;
