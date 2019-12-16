import React from "react";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="back">
      <div className="intro">
        <h2 id="line1">Welcome to the place where we live by </h2>
        <h1 id="line2">Music and Fun!!</h1>
        <a href="http://localhost:8888/auth/login">
          <button className="login-btn" onClick>
            Login with Spotify!
          </button>
        </a>
      </div>
    </div>
  );
};

export default Home;
