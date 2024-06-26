import React from "react";
import TableItem from "./TableItem";
import { useState, useEffect } from "react";
import "../styles/TableItem.css";
import { useNavigate } from "react-router-dom";

const MyTable = ({
  createPath,
  fetchFunction,
  deleteFunction,
  showPath,
  editPath,
  leadingAttribute,
}) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await fetchFunction();
      setItems(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const numberPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const handleDelete = async (id) => {
    try {
      await deleteFunction(id);
      await fetchItems();
    } catch (error) {
      console.error("Error deleting challenge:", error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="show-content ">
      <div className="d-flex justify-content-center align-content-center mt-2">
        <button
          className="btn d-flex align-items-center my-button"
          onClick={() => navigate(createPath)}
        >
          <svg
            className="hover-cursor"
            width="39"
            height="39"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 0C8.72782 0 0 8.72782 0 19.5C0 30.2722 8.72782 39 19.5 39C30.2722 39 39 30.2722 39 19.5C39 8.72782 30.2722 0 19.5 0ZM30.8226 21.7016C30.8226 22.2206 30.398 22.6452 29.879 22.6452H22.6452V29.879C22.6452 30.398 22.2206 30.8226 21.7016 30.8226H17.2984C16.7794 30.8226 16.3548 30.398 16.3548 29.879V22.6452H9.12097C8.60202 22.6452 8.17742 22.2206 8.17742 21.7016V17.2984C8.17742 16.7794 8.60202 16.3548 9.12097 16.3548H16.3548V9.12097C16.3548 8.60202 16.7794 8.17742 17.2984 8.17742H21.7016C22.2206 8.17742 22.6452 8.60202 22.6452 9.12097V16.3548H29.879C30.398 16.3548 30.8226 16.7794 30.8226 17.2984V21.7016Z"
              fill="currentColor"
            />
          </svg>
          <span className="ms-2">Crear</span>
        </button>
      </div>

      <div className="acopios-container">
        {currentItems.map((data) => (
          <TableItem
            key={data.id}
            leading={data[leadingAttribute]}
            onEdit={() => navigate(`${editPath}${data.id}`)}
            onDelete={() => handleDelete(data.id)}
            onShow={() => navigate(`${showPath}${data.id}`)}
          />
        ))}
      </div>
      <div className="row justify-content-evenly p-0 m-0">
        <button
          className="col-auto btn my-button"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Anterior
        </button>
        <span className="col-auto mt-2">
          {currentPage}..{numberPages}
        </span>
        <button
          className="col-auto btn my-button"
          disabled={currentPage === numberPages}
          onClick={handleNextPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default MyTable;
