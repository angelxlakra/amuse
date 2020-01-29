const mongoose = require("mongoose");

const Lobby = mongoose.model(
  "User",
  new mongoose.Schema({
    leader_name: String,
    g_id: String,
    access_tokens: [String],
    leader_access_token: String
  })
);

exports.Lobby = Lobby;
