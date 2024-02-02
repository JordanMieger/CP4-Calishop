import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useUser } from "../contexts/userContext";

import "../styles/login.scss";

export default function Login() {
    const [account, setAccount] = useState({
      email: "",
      password: "",
    });
  
    const { user, setUser } = useUser();
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAccount({ ...account, [name]: value });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, account, {withCredentials: true});
          if (res.status === 200) {
              console.log(`Bienvenue ${res.data.account.firstname} !`);
              setUser(res.data.account);
              window.localStorage.setItem("user", JSON.stringify(res.data.account));
          } 
      } catch (error) {
          console.error(error);
          console.log("Erreur lors de la connexion");
      }
    };
    if (user) {
      return <Navigate to="/" />;
    }

    return (
      <div className="login-page">
        <div className="login-container">
          <h1>Connexion</h1>
          <form className="form" onSubmit={handleSubmit} method="POST">
            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Mot de passe" />
            <button className="login-button" type="submit">
              Se connecter
            </button>
          </form>
          <Link to="/signup">Pas encore de compte ? Inscrivez-vous !</Link>
        </div>
      </div>
    );
}