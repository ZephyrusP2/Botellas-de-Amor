import React from "react";
import "../../../App.css";
import NavbarAdministradores from "../../../components/Administradores/Navbar";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import MyTable from "../../../components/MyTable";
import UserService from "../../../services/user";
import "../../../styles/Show.css";

const IndexUser = () => {
  document.title = "Usuarios";
  const token = localStorage.getItem("token");

  return (
    <>
      <SideBarAdministradores />
      <div className="show-container">
        <NavbarAdministradores />
        <MyTable
          createPath={"crear"}
          editPath={"/administrar/usuarios/Editar/"}
          showPath={"/administrar/usuarios/"}
          deleteFunction={async (id) => await UserService.deleteUser(id, token)}
          fetchFunction={async () => await UserService.listUser(token)}
          leadingAttribute={"email"}
        />
      </div>
    </>
  );
};

export default IndexUser;
