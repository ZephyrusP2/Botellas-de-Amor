import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

export default function App() { 
  return (
    <nav class="navbar navbar-expand-md bg-dark py-3" data-bs-theme="dark">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center text-center" href="#">
          <span>Miguel Sosa</span>
        </a>
        <button
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navcol-5"
        >
          <span class="visually-hidden">Toggle navigation</span>
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navcol-5" class="collapse navbar-collapse text-center">
          <ul class="navbar-nav ms-auto">
            <li class="navbar-item">
              <a class="nav-link active" href="#about">
                About
              </a>
            </li>
            <li class="navbar-item">
              <a class="nav-link active" href="#projects">
                Projects
              </a>
            </li>
            <li class="navbar-item">
              <a class="nav-link active" href="#skills">
                Skills
              </a>
            </li>
            <li class="navbar-item">
              <a class="nav-link active" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

