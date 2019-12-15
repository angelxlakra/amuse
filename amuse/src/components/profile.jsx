import React, { Component } from "react";
import axios from "axios";

class Profile extends Component {
  state = { userData: {}, imageURL: "#", external_URL: "#" };

  componentDidMount() {
    const { params } = this.props;
    axios
      .get("http://localhost:8888/profile", {
        params: { access_token: params.access_token }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          userData: res.data,
          imageURL: res.data.images[0].url,
          externalURL: res.data.external_urls.spotify
        });
      });
  }
  render() {
    const { userData, imageURL, externalURL } = this.state;
    const imagesrc = userData.images;
    console.log(imagesrc);
    return (
      <div>
        <h1>Logged in as {userData.display_name}</h1>
        <div className="media">
          <div className="pull-left">
            <img className="media-object" width="150" src={imageURL} />
          </div>
          <div className="media-body">
            <dl className="dl-horizontal">
              <dt>Display name</dt>
              <dd className="clearfix">{userData.display_name}</dd>
              <dt>Id</dt>
              <dd>{userData.id}</dd>
              <dt>Email</dt>
              <dd>{userData.email}</dd>
              <dt>Spotify URI</dt>
              <dd>
                <a href={externalURL}>{externalURL}</a>
              </dd>
              <dt>Link</dt>
              <dd>
                <a href={userData.href}>{userData.href}</a>
              </dd>
              <dt>Profile Image</dt>
              <dd className="clearfix">
                <a href={imageURL}>{imageURL}</a>
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
