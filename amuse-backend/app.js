var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var morgan = require("morgan");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var oauth = require("./routes/oauth");
var mongoose = require("mongoose");
const { User } = require("./models/user");

mongoose
  .connect("mongodb://localhost/amuse", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to Database.."))
  .catch(err => {
    console.log("Could not connect to Database.", err);
  });

const app = express();

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser())
  .use("/auth", oauth)
  .use(morgan("tiny"));

app.get("/profile/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ s_id: id }).limit(1);
  console.log(user);
  res.send(user);
});

app.get("/top/track/:access_token", async (req, res) => {
  const access_token = req.params.access_token;
  const options = {
    method: "GET",
    url:
      "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=1",
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

app.get("/top/artist/:access_token", async (req, res) => {
  const access_token = req.params.access_token;
  const options = {
    method: "GET",
    url:
      "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=1",
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

app.listen(8888, () => {
  console.log("Listening on port 8888");
});
