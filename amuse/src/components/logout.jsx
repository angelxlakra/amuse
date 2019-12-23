import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id");
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
