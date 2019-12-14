import React from "react";
import { Link } from "react-router-dom";
import "../styles/navBar.css";
import logo1 from "../res/images/logo1.png";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link className="brand" to="#">
            R2M
          </Link>
        </div>
        <ul className="navlinks">
          <li>
            <Link className="nav-item" to="#">
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
        <a className="nav-item login" href="http://localhost:8888/">
          Login
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
