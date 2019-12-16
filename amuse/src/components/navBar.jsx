import React from "react";
import { Link } from "react-router-dom";
import "../styles/navBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link className="brand" to="#">
            Amuse
          </Link>
        </div>
        <ul className="navlinks">
          <li>
            <Link className="nav-item" to="/home ">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="#">
              Shuffle
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="#">
              Group
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="#">
              Settings
            </Link>
          </li>
        </ul>
        {localStorage.getItem("access_token") && (
          <a className="nav-item logout" href="http://localhost:3000/logout">
            Logout
          </a>
        )}
        {!localStorage.getItem("access_token") && (
          <a className="nav-item login" href="http://localhost:8888/auth/login">
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
