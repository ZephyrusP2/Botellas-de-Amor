import React from "react";
import TableItem from "./TableItem";
import { useState, useEffect } from "react";
import ChallengeService from "../services/Challenge";

const dataArray = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "John Smith" },
  { id: 4, name: "Jane Smith" },
  { id: 5, name: "John Johnson" },
  { id: 6, name: "Jane Johnson" },
  { id: 7, name: "John Brown" },
  { id: 8, name: "Jane Brown" },
  { id: 9, name: "John White" },
  { id: 10, name: "Jane White" },
  { id: 11, name: "John Black" },
  { id: 12, name: "Jane Black" },
  { id: 13, name: "John Green" },
  { id: 14, name: "Jane Green" },
  { id: 15, name: "John Blue" },
  { id: 16, name: "Jane Blue" },
  { id: 17, name: "John Red" },
  { id: 18, name: "Jane Red" },
  { id: 19, name: "John Yellow" },
  { id: 20, name: "Jane Yellow" },
  { id: 21, name: "John Orange" },
  { id: 22, name: "Jane Orange" },
  { id: 23, name: "John Purple" },
  { id: 24, name: "Jane Purple" },
  { id: 25, name: "John Pink" },
];

const MyTable = () => {
  const [challenges, setChallenges] = useState([]);
  const challengeService = ChallengeService;
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    challengeService
      .listChallenge(token)
      .then((response) => {
        setChallenges(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = challenges.slice(indexOfFirstItem, indexOfLastItem);
  const numberPages = Math.ceil(challenges.length / itemsPerPage);

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
    <div className="align-items-center flex-column">
      <div className="p-2">
        {currentItems.map((data) => (
          <TableItem
            key={data.id}
            leading={data.challenge}
            onEdit={() => console.log("Edit", data.id)}
            onDelete={() => console.log("Delete", data.id)}
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
        <span className="col-auto">
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
