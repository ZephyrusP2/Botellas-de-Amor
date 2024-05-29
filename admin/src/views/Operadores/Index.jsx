import React from "react";
import "../../App.css";
import NavbarOperadores from "../../components/Operadores/Navbar";
import SideBarOperadores from "../../components/Operadores/SideBar";
import MyTable from "../../components/MyTable";
import dispositionService from "../../services/disposition";
import "../../styles/Show.css";

const IndexRegister = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <SideBarOperadores />
      <div className="show-container">
        <NavbarOperadores />
        <MyTable
          createPath={"../operador/registrar-botellas"}
          editPath={"/operador/registrar-botellas/editar/"}
          showPath={"/operador/registrar-botellas/"}
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

export default IndexRegister;
