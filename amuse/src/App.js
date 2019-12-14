import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import { tsConstructorType } from "@babel/types";

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    console.log(params);
  }

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
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
      </React.Fragment>
    );
  }
}

export default App;
