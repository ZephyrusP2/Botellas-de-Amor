import React from "react";
import Login from "./views/LoginView";
import AdminView from "./views/AdminView";
import OperatorView from "./views/OperatorView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/operator" element={<OperatorView />} />
      </Routes>
    </Router>
  );
}
