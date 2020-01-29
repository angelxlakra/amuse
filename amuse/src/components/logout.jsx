import { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("refresh_token");
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
