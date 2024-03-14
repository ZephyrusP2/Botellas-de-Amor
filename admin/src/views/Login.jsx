import { useState } from "react";
import React from "react";
import "../styles/Login.css";
import "../App.css";

const Login = () => {
  return (
    <div className="app-container-wrapper">
      <div className="container-fluid app-container bg-myPrimary">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-3 custom-min-width col-sm-4">
            <div className="card border-white rounded-3">
              <div className="card-body mx-3">
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Correo
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      id="username"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control rounded-3"
                      id="password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary container-fluid mt-3"
                  >
                    Comenzar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
