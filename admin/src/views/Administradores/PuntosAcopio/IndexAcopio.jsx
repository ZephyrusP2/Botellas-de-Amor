import React from "react";
import "../../../App.css";
import NavbarAdministradores from "../../../components/Administradores/Navbar";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import MyTable from "../../../components/MyTable";
import SiteService from "../../../services/site";
import "../../../styles/Show.css";

const IndexSite = () => {
  document.title = "Acopios";
  const token = localStorage.getItem("token");

  return (
    <>
      <SideBarAdministradores />
      <div className="show-container">
        <NavbarAdministradores />
        <MyTable
          createPath={"crear"}
          editPath={"/administrar/puntos-acopio/Editar/"}
          showPath={"/administrar/puntos-acopio/"}
          deleteFunction={async (id) => await SiteService.deleteSite(id, token)}
          fetchFunction={async () => await SiteService.listSite(token)}
          leadingAttribute={"name"}
        />
      </div>
    </>
  );
};

export default IndexSite;
