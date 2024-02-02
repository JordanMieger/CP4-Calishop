import { Link } from "react-router-dom";
import Logo from "../../Assets/Images/Logocut.png";
import Basketlogo from "../../Assets/Images/BasketLogo.png";
import Profilelogo from "../../Assets/Images/ProfileLogo.png";
import { useUser } from "../contexts/userContext";
import Logout from "../components/Logout"; // Assuming Logout component is in this path
import { useState } from "react";

import "../styles/navbar.scss";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="navbar">
      <p className="slogan">
        BE STRONGER <br /> THAN YOUR EXCUSES
      </p>
      <div className="logo-container">
        <Link to="/">
          <img src={Logo} alt="Calishop-logo" className="logo" />
        </Link>
      </div>
      <ul className="navlist">
        <h3>{user ? user.firstname : ""}</h3>
        <li>
          {user ? (
            <>
              <Logout user={user} />
              <Link to="/Profile">
                <img
                  src={Profilelogo}
                  alt="logoprofile"
                  className="logo-profile"
                />
              </Link>
            </>
          ) : (
            <Link to="/Login">
              <img
                src={Profilelogo}
                alt="logoprofile"
                className="logo-profile"
              />
            </Link>
          )}
        </li>
        <li>
          <Link to="/Basket">
            <img src={Basketlogo} alt="logobasket" className="logo-basket" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
