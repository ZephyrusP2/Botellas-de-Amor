import React from "react";
import "../styles/TableItem.css";
import "../App.css";
import "../styles/Show.css";

const TableItem = ({ leading, onEdit, onDelete, onShow }) => {
  const handleEditClick = (event) => {
    event.stopPropagation();
    onEdit();
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDelete();
  };

  // Obtener la ruta actual
  const currentPath = window.location.pathname;

  // Verificar si la ruta coincide
  const isDesiredPath = currentPath === "/operador/registrar-botellas/historial";

  return (
    <div className="acopio-container" onClick={onShow} id="my-container">
      {/* Mostrar "Id usuario: {leading}" solo si la ruta coincide */}
      {isDesiredPath && (
        <h2 id="leading" className="acopio-text" title={leading}>
          Id usuario: {leading}
        </h2>
      )}
      {!isDesiredPath && (
        <h2 id="leading" className="acopio-text" title={leading}>
          {leading}
        </h2>
      )}
      <div className="col-auto">
        <div className="col-auto">
          <svg
            onClick={handleEditClick}
            className=""
            width="25"
            height="25"
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Resto del SVG para editar */}
          </svg>
          <svg
            onClick={handleDeleteClick}
            className="icon-acopio"
            width="25"
            height="28"
            viewBox="0 0 35 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Resto del SVG para eliminar */}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TableItem;
