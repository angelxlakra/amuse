import React from "react";
import { Link } from "react-router-dom";
import "../styles/navBar.css";
import Party from "./party";

const NavBar = ({ username, pr_img }) => {
  const name = username.split(" ")[0];
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
            <Link className="nav-item" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/search">
              Search
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/party">
              Party
            </Link>
          </li>
        </ul>
        <div className="profiler1">
          {sessionStorage.getItem("access_token") && (
            <div className="profiler2">
              <img className="prof_img" src={pr_img} alt="prof_img"></img>
              <Link className="nav-item prof" to="/profile">
                {name}
              </Link>
            </div>
          )}
          {sessionStorage.getItem("access_token") && (
            <Link className="nav-item logout" to="/logout">
              Logout
            </Link>
          )}
          {!sessionStorage.getItem("access_token") && (
            <a
              className="nav-item login"
              href="http://192.168.157.122:8888/auth/login"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
