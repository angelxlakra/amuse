import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import Profile from "./components/profile";
import Home from "./components/home";
import LoggedIn from "./components/loggedIn";
// import LoggedIn from "./components/loggedIn";
import Logout from "./components/logout";

class App extends Component {
  render() {
    let token = localStorage.getItem("access_token");
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <main className="container1">
          <Switch>
            <Route path="/loggedIn" component={LoggedIn}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route
              path="/profile"
              render={props => <Profile accessToken={token}></Profile>}
            ></Route>
            <Route path="/" component={Home}></Route>
            <Redirect from="/" exact to="/home" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
