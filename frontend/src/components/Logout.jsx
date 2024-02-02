import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useUser } from "../contexts/userContext";
import "../styles/logout.scss";

export default function logout() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log("Vous êtes déconnecté");
        setUser(false);
        window.localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      console.log("Erreur lors de la déconnexion");
    }
  };

  return (
    <div className="deconnexion">
    <Link to="/" className="logout-link" onClick={handleLogout}>
      Se déconnecter
    </Link>
    </div>
  );
}
