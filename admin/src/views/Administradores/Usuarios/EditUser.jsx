import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBarAdministradores from "../../../components/Administradores/SideBar";
import BackButton from "../../../components/BackButton";
import UserService from "../../../services/user";
import "../../../styles/Forms.css";

const EditUser = ({ userId }) => {
  document.title = "Editar usuario";
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.showUser(id, token);
      setName(response.data.name);
      setLastName(response.data.last_name);
      setBirthDate(response.data.birth_date);
      setLocation(response.data.location);
      setGender(response.data.gender);
      setEmail(response.data.email);
      setRole(response.data.role);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setValidationErrors({ general: "Error al cargar los datos del usuario" });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const validateUser = () => {
    const errors = {};
    if (!name) {
      errors.name = "Se requiere el nombre";
    }
    if (!lastName) {
      errors.lastName = "Se requiere el apellido";
    }
    if (!birthDate) {
      errors.birthDate = "Se requiere la fecha de nacimiento";
    }
    if (!location) {
      errors.location = "Se requiere la ubicación";
    }
    if (!gender) {
      errors.gender = "Se requiere seleccionar el género";
    }
    if (!email) {
      errors.email = "Se requiere el correo electrónico";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Correo electrónico inválido";
    }
    if (!role) {
      errors.role = "Se requiere seleccionar el rol";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateUser()) {
      return;
    }

    const userData = {
      name: name,
      last_name: lastName,
      birth_date: birthDate,
      location: location,
      gender: gender,
      email: email,
      role: role,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await UserService.updateUser(id, userData, token);
      if (password) {
        await UserService.changePasswordUser(
          id,
          { new_password: password },
          token,
        );
      }
      setName("");
      setLastName("");
      setBirthDate("");
      setLocation("");
      setGender("");
      setEmail("");
      setRole("");
      setPassword("");
      setConfirmPassword("");
      navigate("/administrar/usuarios");
    } catch (error) {
      console.error("Error updating user:", error);
      setValidationErrors({
        ...validationErrors,
        general: "Ocurrió un error al editar el usuario",
      });
    }
  };

  return (
    <>
      <SideBarAdministradores />
      <div className="d-flex flex-column align-items-start p-4 container-fluid">
        <BackButton route="/administrar/usuarios" />
        <h1 className="container-fluid text-center">Editar usuario</h1>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center container m-0 p-0"
        >
          {/* Name */}
          <label className="d-flex flex-column form-label w-50">
            Nombre
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control rounded-3"
            />
            {validationErrors.name && (
              <span className="error-message">{validationErrors.name}</span>
            )}
          </label>

          {/* Last Name */}
          <label className="d-flex flex-column form-label w-50">
            Apellido
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control rounded-3"
            />
            {validationErrors.lastName && (
              <span className="error-message">{validationErrors.lastName}</span>
            )}
          </label>

          {/* Birth Date */}
          <label className="d-flex flex-column form-label w-50">
            Fecha de nacimiento
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="form-control rounded-3"
            />
            {validationErrors.birthDate && (
              <span className="error-message">
                {validationErrors.birthDate}
              </span>
            )}
          </label>

          {/* Location */}
          <label className="d-flex flex-column form-label w-50">
            Ubicación
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control rounded-3"
            />
            {validationErrors.location && (
              <span className="error-message">{validationErrors.location}</span>
            )}
          </label>

          {/* Gender */}
          <label className="d-flex flex-column form-label w-50">
            Género
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="form-control rounded-3"
            >
              <option value="">Seleccionar género</option>
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
              <option value="otro">Otro</option>
            </select>
            {validationErrors.gender && (
              <span className="error-message">{validationErrors.gender}</span>
            )}
          </label>

          {/* Email */}
          <label className="d-flex flex-column form-label w-50">
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control rounded-3"
            />
            {validationErrors.email && (
              <span className="error-message">{validationErrors.email}</span>
            )}
          </label>

          {/* Role */}
          <label className="d-flex flex-column form-label w-50">
            Rol
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-control rounded-3"
            >
              <option value="">Seleccionar rol</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
              <option value="operator">Operador</option>
            </select>
            {validationErrors.role && (
              <span className="error-message">{validationErrors.role}</span>
            )}
          </label>

          {/* Password */}
          <label className="d-flex flex-column form-label w-50">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control rounded-3"
            />
            {validationErrors.password && (
              <span className="error-message">{validationErrors.password}</span>
            )}
          </label>

          {/* Confirm Password */}
          <label className="d-flex flex-column form-label w-50">
            Confirmar Contraseña
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control rounded-3"
            />
            {validationErrors.confirmPassword && (
              <span className="error-message">
                {validationErrors.confirmPassword}
              </span>
            )}
          </label>

          <button type="submit" className="btn btn-primary mt-3 w-50">
            Editar usuario
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUser;
