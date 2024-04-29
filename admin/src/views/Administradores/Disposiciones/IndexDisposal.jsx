import React, { useEffect } from "react";
import "../../../App.css";
import NavbarAdministradores from "../../../components/Administradores/Navbar";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import MyTable from "../../../components/MyTable";
import dispositionService from "../../../services/disposition";
import "../../../styles/Show.css";

const IndexDisposal = () => {
  const token = localStorage.getItem("token");
  document.title = "Disposiciones";
 

  return (
    <>
      <SideBarAdministradores />
      <div className="show-container">
        <NavbarAdministradores />
        <MyTable
          createPath={"/administrar/disposiciones/crear/"}
          editPath={"/administrar/disposiciones/editar/"}
          showPath={"/administrar/disposiciones/"}
          deleteFunction={async (id) =>
            await dispositionService.deleteDisposition(id, token)
          }
          fetchFunction={async () =>
            await dispositionService.listDisposition(token)
          }
          leadingAttribute={"user"}
        />
      </div>
    </>
  );
};

export default IndexDisposal;
