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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const login = async (email, password) => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError("Correo no válido");
    } else {
      setEmailError("");
    }

    if (!isPasswordValid) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
    } else {
      setPasswordError("");
    }

    if (!isEmailValid || !isPasswordValid) {
      setError("");
      return;
    }

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
        setError("Credenciales incorrectas");
        console.log("login", error);
      });
  };

  return (
    <div className="app-container-wrapper">
      <div className="container-fluid app-container bg-myPrimary">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-3 custom-min-width col-sm-4">
            <div className="card border-white rounded-3">
              <div className="card-body mx-3">
                {error && <div className="error-message mt-3">{error}</div>}
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
                    {emailError && (
                      <div className="error-message">{emailError}</div>
                    )}
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
                    {passwordError && (
                      <div className="error-message">{passwordError}</div>
                    )}
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
