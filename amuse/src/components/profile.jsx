import React, { Component } from "react";
import axios from "axios";
import "../styles/profile.css";

class Profile extends Component {
  state = { userData: {} };

  async componentDidMount() {
    const id = localStorage.getItem("id");
    const { data } = await axios.get("http://localhost:8888/profile/" + id);
    console.log(data);
    this.setState({ userData: data[0] });
  }
  render() {
    const { userData } = this.state;
    console.log("Name", userData.name);
    return (
      <div className="profile-back">
        <div className="userdata">
          <div className="image-con">
            <a href={userData.image_url}>
              <img className="profileImage" src={userData.image_url}></img>
            </a>
          </div>
          <div className="name">
            <h1>{userData.name}</h1>
          </div>
          <div id="informs">
            <table className="informs">
              <tr>
                <th>Spotify ID</th>
                <th>{userData.s_id}</th>
              </tr>
              <tr>
                <th>Email ID</th>
                <th>{userData.email}</th>
              </tr>
              <tr>
                <th>Country</th>
                <th>{userData.country}</th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
