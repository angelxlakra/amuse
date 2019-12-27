var express = require("express");
var request = require("request"); // "Request" library
var querystring = require("querystring");
const mongoose = require("mongoose");
const { User } = require("../models/user");

var client_id = "7fd9b8e707e14fb18cd423001d6de23e";
var client_secret = "dd219eb452524a05aa4e07f5ed7291db"; // Your secret
var redirect_uri = "http://localhost:8888/auth/callback"; // Your redirect uri

const stateKey = "spotify_auth_state";

const app = express.Router();

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

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  const scope =
    "user-read-playback-state user-read-email playlist-read-collaborative user-modify-playback-state user-read-private playlist-modify-public user-library-modify user-top-read user-read-currently-playing playlist-read-private user-follow-read app-remote-control user-read-recently-played playlist-modify-private user-follow-modify user-library-read ";
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

var url = "http://localhost:3000/loggedIn/";

app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch"
        })
    );
  } else {
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
          new Buffer.from(client_id + ":" + client_secret).toString("base64")
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        var refresh_token = body.refresh_token;

        const options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true
        };
        request.get(options, (error, response, body) => {
          url = body.id;
          async function getData() {
            const user = await User.find({ s_id: body.id });
            // console.log(body);
            if (!user.length) {
              let image =
                "https://www.kodefork.com/static/users/images/user.png";
              if (body.images.length) {
                image = body.images[0].url;
              }
              const user = new User({
                name: body.display_name,
                s_id: body.id,
                image_url: image,
                country: body.country,
                email: body.email,
                premium: false,
                followers: body.followers.total
              });
              if (body.product === "premium") {
                user.premium = true;
              }
              user.save();
              console.log("Saved user...");
            }
            res.redirect(
              "http://localhost:3000/loggedIn/#" +
                querystring.stringify({
                  id: body.id,
                  access_token: access_token,
                  refresh_token: refresh_token
                })
            );
          }
          getData();
        });
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token"
            })
        );
      }
      console.log("id", url);
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
        new Buffer.from(client_id + ":" + client_secret).toString("base64")
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

module.exports = app;
