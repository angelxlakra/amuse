import React, { Component } from "react";
import axios from "axios";
import "../styles/profile.css";

class Profile extends Component {
  state = { userData: {}, artist: {}, track: {} };

  async componentDidMount() {
    const id = localStorage.getItem("id");
    const access = localStorage.getItem("access_token");
    const { data } = await axios.get("http://localhost:8888/profile/" + id);
    const track = await axios.get("http://localhost:8888/top/track/" + access);
    const artist = await axios.get(
      "http://localhost:8888/top/artist/" + access
    );
    console.log(track);
    console.log(artist);

    if (track.data.error) {
      alert("Session Timed Out, Login Again!!!");
      window.location = "/logout";
    }
    this.setState({
      userData: data[0],
      track: track.data.items[0],
      artist: artist.data.items[0]
    });
  }
  render() {
    const { userData, artist, track } = this.state;
    let cond = false;
    if (track.album && artist) {
      cond = true;
      console.log("Name", track.album.images[0]);
    }
    return (
      <div className="bodyProfile">
        <div className="profiler backs">
          <div className="profiler fronts">
            <svg
              id="blob1"
              width="600"
              height="600"
              viewBox="0 0 600 600"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(300,300)">
                <path
                  d="M112.3,-131.9C157.9,-121.4,215.9,-105.2,225.6,-73.7C235.2,-42.2,196.6,4.5,178.9,57.9C161.3,111.3,164.7,171.4,138.4,203C112.1,234.6,56,237.8,8.1,226.6C-39.8,215.4,-79.5,189.8,-125.2,164.5C-170.8,139.2,-222.4,114.1,-225.3,79.3C-228.3,44.5,-182.6,0,-151.5,-34.8C-120.3,-69.6,-103.6,-94.7,-80.8,-112.6C-58,-130.5,-29,-141.2,2.2,-144.2C33.3,-147.2,66.6,-142.4,112.3,-131.9Z"
                  fill="#ffffff80"
                />
              </g>
            </svg>
          </div>
          <div className="cover">
            <svg
              id="pattern"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#0000ff"
                fill-opacity="0.5"
                d="M0,64 L26.7,96 C53.3,128, 107,192,160,197.3C213.3,203,267,149,320,112C373.3,75,427,53,480,64C533.3,75,587,117,640,128C693.3,139,747,117,800,106.7C853.3,96,907,96,960,106.7C1013.3,117,1067,139,1120,154.7C1173.3,171,1227,181,1280,181.3C1333.3,181,1387,171,1413,165.3L1440,160L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
              ></path>
              <path
                fill="#0099ff"
                fill-opacity="0.5"
                d="M0,192L26.7,181.3C53.3,171,107,149,160,133.3C213.3,117,267,107,320,112C373.3,117,427,139,480,149.3C533.3,160,587,160,640,160C693.3,160,747,160,800,165.3C853.3,171,907,181,960,186.7C1013.3,192,1067,192,1120,160C1173.3,128,1227,64,1280,42.7C1333.3,21,1387,43,1413,53.3L1440,64L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
              ></path>
            </svg>
          </div>
          <div className="userInfo">
            <div className="pro_pic">
              <img id="pro_pic" src={userData.image_url}></img>
            </div>
            <h1 id="uName">{userData.name}</h1>
            <div className="uData">
              <h1>Account Information</h1>
              <div id="uData">
                <p className="th">
                  Spotify ID: <span className="td">{userData.s_id}</span>
                </p>
                <p className="th">
                  Email: <span className="td">{userData.email}</span>
                </p>
                <p className="th">
                  Country: <span className="td">{userData.country}</span>
                </p>
                <p className="th">
                  Followers: <span className="td">{userData.followers}</span>
                </p>

                <a
                  className="td pro_link"
                  href={"https://open.spotify.com/user/" + userData.s_id}
                >
                  Visit Profile
                </a>
              </div>
            </div>
          </div>
          {cond && (
            <div className="topData">
              <svg
                id="blob2"
                width="1100"
                height="1100"
                viewBox="0 0 1100 1100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  transform="translate(500,350)
                scale(2.2,1.9)"
                >
                  <path
                    d="M139.2,-160.8C184.4,-158.8,227.7,-123.4,226.6,-83.8C225.4,-44.2,179.7,-0.3,155.2,42.8C130.7,85.9,127.4,128.3,105,147.2C82.7,166.1,41.3,161.6,-1.3,163.3C-43.9,165.1,-87.8,173.1,-133.9,162C-180,150.8,-228.4,120.4,-240.4,79.1C-252.3,37.9,-227.9,-14.1,-204.7,-60.7C-181.5,-107.2,-159.5,-148.2,-125.6,-153.9C-91.7,-159.5,-45.8,-129.8,0.6,-130.6C47,-131.4,94,-162.8,139.2,-160.8Z"
                    fill="#000000"
                  />
                </g>
              </svg>
              <div className="topTrack">
                <h1 className="headTrack">Most Played Recent Track</h1>
                <p id="paraTrack">
                  <a className="paraTrack" href={track.external_urls.spotify}>
                    {track.name}
                  </a>
                </p>
                <img id="topTrackImg" src={track.album.images[0].url}></img>
              </div>
              <div className="topArtist">
                <img id="topArtistImg" src={artist.images[0].url}></img>
                <h1 className="headArtist">Most Played Recent Artist</h1>
                <p id="paraArtist">
                  <a className="paraArtist" href={artist.external_urls.spotify}>
                    {artist.name}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="foot"></div>
      </div>
    );
  }
}

export default Profile;
