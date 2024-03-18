import { useState } from "react";
import React from "react";
import "../styles/Login.css";
import "../App.css";
import AdminService from "../services/admin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const login = async (email, password) => {
    const userData = {
      email: email,
      password: password,
    };
    AdminService.login(userData)
      .then((response) => {
        setToken(response.data.token);
        setEmail(userData.email);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", userData.email);
        setError("");
      })
      .catch((error) => {
        console.log("login", error);
        setError(error.toString());
      });
  };

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
                      onChange={(e) => setEmail(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary container-fluid mt-3"
                    onClick={(e) => {
                      e.preventDefault();
                      login(email, password);
                    }}
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
