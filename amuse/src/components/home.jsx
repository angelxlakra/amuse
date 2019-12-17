import React from "react";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="back">
      <div className="intro">
        <h2 id="line1">Welcome to the place </h2>
        <h2 id="line1">where we live by</h2>
        <h1 id="line2">Music and Fun!!</h1>
        <div className="para">
          <p className="par">Are you here to party</p>
          <p className="par">the way we really mean it,</p>
          <p className="par">with our music turned up loud?</p>
          <p className="par">Click below to get Started.</p>
        </div>
        <a className="login-btn" href="http://localhost:8888/auth/login">
          <span className="spotify-ic">
            <i className="fab fa-spotify"></i>
          </span>
          Login with Spotify!
        </a>
      </div>
    </div>
  );
};

export default Home;
