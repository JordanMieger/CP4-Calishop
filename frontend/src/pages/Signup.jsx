import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import "../styles/Signup.scss";

function Signup() {
  const [created, setCreated] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    lastname: "",
    firstname: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        user
      );
      if (response.status === 201) {
        setCreated(true)
        console.log("Compte créé avec succès");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log("Cette adresse Email est déjà utilisée");
      } else if (error.response && error.response.status === 400) {
        console.log("Veuillez remplir tous les champs");
      } else {
        console.log("Une erreur est survenue, veuillez réessayer plus tard");
      }
    }
  };

  if (created) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Inscription</h1>
        <form
          className="form"
          onSubmit={handleSubmit}
          action="/signup"
          method="POST"
        >
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            placeholder="Mot de passe"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={user.lastname}
            placeholder="Nom"
            onChange={handleChange}
          />
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={user.firstname}
            placeholder="Prénom"
            onChange={handleChange}
          />

          <button className="signup-button" type="submit">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
