const express = require("express"),
  request = require("request"),
  app = express.Router(),
  querystring = require("querystring"),
  { Lobby } = require("../models/lobby");

var morgan = require("morgan");

app.use(morgan("tiny"));

app.get("/new", (req, res) => {
  const lobby = new Lobby({});
});
