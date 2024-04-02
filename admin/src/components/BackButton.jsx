import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackButton = ({ route }) => {
  const navigate = useNavigate();

  return (
    <IoIosArrowBack
      className="blue-text mb-3 hover-cursor"
      size={40}
      onClick={() => navigate(route)}
    />
  );
};

export default BackButton;
