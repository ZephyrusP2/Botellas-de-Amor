import React from "react";
import MyTable from "../../../components/MyTable";
import UserService from "../../../services/user";
import NavbarAdministradores from "../../../components/Administradores/Navbar";
import "../../../App.css";
import "../../../styles/Show.css";

const IndexUser = () => {
  document.title = "Usuarios";
  const token = localStorage.getItem("token");

  return (
    <div className="show-container">
      <NavbarAdministradores />
      <MyTable
        createPath={"Crear"}
        editPath={"/Administrar/Usuarios/Editar/"}
        showPath={"/Administrar/Usuarios/"}
        deleteFunction={async (id) =>
          await UserService.deleteUser(id, token)
        }
        fetchFunction={async () => await UserService.listUser(token)}
        leadingAttribute={"email"}
      />
    </div>
  );
};

export default IndexUser;
