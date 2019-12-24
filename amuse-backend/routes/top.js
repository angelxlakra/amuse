const express = require("express"),
  request = require("request"),
  app = express.Router();

app.get("/track/:access_token", async (req, res) => {
  const access_token = req.params.access_token;
  const options = {
    method: "GET",
    url:
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  };
  request(options, (error, response, body) => {
    if (error) {
      return console.log("Failed to get Data");
    }
    res.send(JSON.parse(body));
  });
});

app.get("/artist/:access_token", async (req, res) => {
  const access_token = req.params.access_token;
  const options = {
    method: "GET",
    url:
      "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=1",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  };
  request(options, (error, response, body) => {
    if (error) {
      return console.log("Failed to get Data");
    }
    res.send(JSON.parse(body));
  });
});

module.exports = app;
