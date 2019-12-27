const express = require("express"),
  request = require("request"),
  app = express.Router();

app.get("/", async (req, res) => {
  var query = req.query.query;
  query = query.replace(" ", "%20");
  const access_token = req.query.access_token;
  const filter = JSON.parse(req.query.filter);
  var types = "";
  if (filter.artist) {
    types += "artist%2C";
  }
  if (filter.album) {
    types += "album%2C";
  }
  if (filter.track) {
    types += "track%2C";
  }
  if (filter.playlist) {
    types += "playlist%2C";
  }
  types = types.substring(0, types.length - 3);
  //   console.log("Types", types);
  const url = "https://api.spotify.com/v1/search?";
  const options = {
    method: "GET",
    url: url + "q=" + query + "&type=" + types + "&market=US&limit=5",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      res.status(404);
      res.send("Failed to get data");
    }
    res.send(JSON.parse(body));
  });
});

module.exports = app;
