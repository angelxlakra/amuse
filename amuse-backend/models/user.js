const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    s_id: String,
    image_url: { type: String, default: "" },
    country: String,
    email: String,
    premium: { type: Boolean, default: false },
    followers: String
  })
);

exports.User = User;
