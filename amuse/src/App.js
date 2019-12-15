import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import Profile from "./components/profile";

class App extends Component {
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
        <main className="container">
          <Switch>
            <Route
              path="/profile"
              render={props => (
                <Profile params={this.getHashParams()}></Profile>
              )}
            ></Route>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
