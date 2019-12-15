var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var client_id = "b2c9084b03044c03b47f0cf5174e7a84";
var client_secret = "15f7cfb307144423a03250638c34781b"; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri

//Generate random String containing numbers and alphabets
var generateRandomString = length => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

const app = express();

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  const scope = "user-read-private user-read-email user-read-playback-state";
  console.log(1);
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  console.log(2);

  if (state === null || state !== storedState) {
    console.log(2.1);
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch"
        })
    );
  } else {
    console.log(2.2);
    res.clearCookie(stateKey);
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64")
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log(3.1);
        var access_token = body.access_token;
        var refresh_token = body.refresh_token;

        const options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true
        };

        request.get(options, (error, response, body) => {
          // console.log(body);
        });

        res.redirect(
          "http://localhost:3000/profile/#" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            })
        );
      } else {
        console.log(3.2);
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token"
            })
        );
      }
    });
  }
});

app.get("/refresh_token", function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64")
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token
      });
    }
  });
});

app.get("/profile", (req, res) => {
  const access_token = req.query.access_token;
  // console.log(access_token);
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
