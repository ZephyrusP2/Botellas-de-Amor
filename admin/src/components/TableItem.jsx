import React from "react";
import "../styles/TableItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
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

  return (
    <div
      className="container rounded-2 my-2 py-2 flex-wrap hover-cursor"
      onClick={onShow}
      id="my-container"
    >
      <div className="row align-items-center justify-content-between">
        <h2 id="leading" className="col-auto" title={leading}>
          {leading}
        </h2>
        <div className="col-auto">
          <div className="col-auto">
            <FontAwesomeIcon
              icon={faPencilAlt}
              className="icon hover-cursor mx-3 fa-2x"
              onClick={handleEditClick}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="icon hover-cursor mx-3 fa-2x"
              onClick={handleDeleteClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableItem;
