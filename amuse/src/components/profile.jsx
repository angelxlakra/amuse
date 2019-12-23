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
      <div className="profiler backs">
        <div className="profiler fronts"></div>
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
            <animate
              repeatCount="indefinite"
              fill="#454599"
              attributeName="d"
              dur="12s"
              values=""
            ></animate>
          </svg>
        </div>
        <div className="userInfo">
          <div className="pro_pic">
            <img id="pro_pic" src={userData.image_url}></img>
          </div>
          <h1 id="uName">{userData.name}</h1>
        </div>
      </div>
    );
  }
}

export default Profile;
