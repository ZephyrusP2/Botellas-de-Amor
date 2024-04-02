import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import MyTable from "./components/MyTable.jsx";
import "../scss/custom.scss";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
