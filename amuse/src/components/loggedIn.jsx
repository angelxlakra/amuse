import React, { Component } from "react";

class LoggedIn extends Component {
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
  componentDidMount() {
    const tokens = this.getHashParams();
    localStorage.setItem("access_token", tokens.access_token);
    setTimeout(function() {
      window.location = "/";
    }, 2000);
  }
  render() {
    return (
      <div className="loggedin">
        <h1>Logged in Succesfully, Redirecting ...</h1>
      </div>
    );
  }
}

export default LoggedIn;
