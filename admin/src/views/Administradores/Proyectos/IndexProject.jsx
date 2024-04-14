import React from "react";
import "../../../App.css";
import NavbarAdministradores from "../../../components/Administradores/Navbar";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import MyTable from "../../../components/MyTable";
import projectService from "../../../services/project";
import "../../../styles/Show.css";

const IndexProject = () => {
  document.title = "Proyectos";
  const token = localStorage.getItem("token");

  return (
    <>
      <SideBarAdministradores />
      <div className="show-container">
        <NavbarAdministradores />
        <MyTable
          createPath={"crear"}
          editPath={"/administrar/proyectos/editar/"}
          showPath={"/administrar/proyectos/"}
          deleteFunction={async (id) => await projectService.deleteProject(id, token)}
          fetchFunction={async () => await projectService.listProject(token)}
          leadingAttribute={"name"}
        />
      </div>
    </>
  );
};

export default IndexProject;
