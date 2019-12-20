import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import Profile from "./components/profile";
import Home from "./components/home";
import LoggedIn from "./components/loggedIn";
// import LoggedIn from "./components/loggedIn";
import Logout from "./components/logout";
import axios from "axios";

class App extends Component {
  state = { username: "12", pr_img: "", id: "" };

  async componentDidMount() {
    const id = localStorage.getItem("id");
    if (id && this.state.id != id) {
      let { data } = await axios.get("http://localhost:8888/profile/" + id);
      data = data[0];
      this.setState({ username: data.name, pr_img: data.image_url, id: id });
    }
  }

  render() {
    const { username, pr_img } = this.state;
    return (
      <React.Fragment>
        <NavBar username={username} pr_img={pr_img}></NavBar>
        <main className="container1">
          <Switch>
            <Route path="/loggedIn" component={LoggedIn}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route
              path="/profile"
              render={props => <Profile></Profile>}
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
