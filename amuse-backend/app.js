var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var cors = require("cors");
var cookieParser = require("cookie-parser");
var oauth = require("./routes/oauth");

const app = express();
app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser())
  .use("/auth", oauth);

app.get("/profile", (req, res) => {
  const access_token = req.query.access_token;
  console.log(access_token);
  const options = {
    url: "https://api.spotify.com/v1/me",
    headers: { Authorization: "Bearer " + access_token }
  };
  request.get(options, (error, response, body) => {
    // console.log(body);
    res.send(body);
  });
});

app.listen(8888, () => {
  console.log("Listening on port 8888");
});
