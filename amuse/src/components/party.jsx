import React from "react";
import axios from "axios";

function handleLobbyCreate() {
  const access_token = sessionStorage.getItem("access_token");
  // const res = await axios.get("http://localhost:8888/new/")
}

const Party = () => {
  return (
    <div>
      <h1>Welcome to the party page!!</h1>
      <button onClick={handleLobbyCreate}>Create Group</button>
      <a href="/new">Join Group</a>
    </div>
  );
};

export default Party;
