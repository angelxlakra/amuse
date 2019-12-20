import React, { Component } from "react";
import axios from "axios";

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
      <div>
        <h1>Logged in as {userData.name}</h1>
        <div className="media">
          <div className="pull-left">
            <img
              className="media-object"
              width="150"
              src={userData.image_url}
              alt="profile"
            />
          </div>
          <div className="media-body">
            <dl className="dl-horizontal">
              <dt>Display name</dt>
              <dd className="clearfix">{userData.name}</dd>
              <dt>Id</dt>
              <dd>{userData.s_id}</dd>
              <dt>Email</dt>
              <dd>{userData.email}</dd>
              <dt>Spotify URI</dt>
              <dt>Profile Image</dt>
              <dd className="clearfix">
                <a href={userData.image_url}>{userData.image_url}</a>
              </dd>
              <dt>Country</dt>
              <dd>{userData.country}</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
