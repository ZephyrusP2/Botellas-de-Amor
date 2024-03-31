import React from "react";
import "../styles/TableItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const TableItem = ({ leading, onEdit, onDelete }) => {
  return (
    <div className="container rounded-2 my-2 py-2 flex-wrap" id="my-container">
      <div className="row align-items-center justify-content-between">
        <h2 id="leading" className="col-auto" title={leading}>
          {leading}
        </h2>
        <div className="col-auto">
          <div className="col-auto">
            <FontAwesomeIcon
              icon={faPencilAlt}
              className="icon hover-cursor mx-3 fa-2x"
              onClick={onEdit}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="icon hover-cursor mx-3 fa-2x"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableItem;
