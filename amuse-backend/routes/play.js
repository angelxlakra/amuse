const express = require("express"),
  axios = require("axios"),
  app = express.Router();

var morgan = require("morgan");

app.use(morgan("tiny"));

var access_tokens = [
  "BQBEWg55gSZrcg5sQovJYH_dfCwpS_Uio3QGL9BDRuLIMPYdYbYX1aIJoyc84W7gt9OAJirUNdz4ThHo6dHaA-MjmoVophSszwhSnggVVvxRtZloPlP9VcnYv6Mie01W1tXgM91TlYoqWx921uZLlzkmAdgyiKA3xFcVGbt6qLqxoRlZJj3lgGttR6peyF-9UdUiOOwsnmen1tB6SPKP1X1nEAQUfl6LJ6yv5HQ-GU8chHOZtpcHKYC8sT7xJAoiy0pcgMq0idanZyezUbFa0y7tQ5oyrAHxQMGndpE",
  "BQBN_Hjx0Bq_R3ESkXL5ANDnXN5HM7endknZiUf5Q4L-pim32884O6BtHKcBTlTHusd-vbO9jxZEnBwLyZAO5uxzIBVICw0jKBodZa5-MzprKkp_5r_fJOUt9FcOPmzCyFclhQ6uJa4Gpd_fVjHaNjoJD3tbxADzQGomE6EjYRQskECopBceoJPca9dK_fBXKSUzsv9qjARQiCRMb9yw4Pp_UoiwNjaF6SDQ9fYU09g88HZKbPs1fCYbGOx_QqrKQu2-lQ0EF19m8dSAdBRgTr5PhLccqiCds8Jc8X0"
];

app.get("/:id", (req, res) => {
  const url = "https://api.spotify.com/v1/me/player/play";
  let i = 0;
  const id = req.params.id;
  let body = {
    uris: [id],
    position_ms: 0
  };
  access_tokens.map(async token => {
    const options = {
      method: "put",
      url: url,
      data: body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      json: true
    };
    await axios(options);
    // await axios({
    //   method: "put",
    //   url: "https://api.spotify.com/v1/me/player/pause",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + token
    //   }
    // });
  });
  setTimeout(function() {
    access_tokens.map(async token => {
      const options = {
        method: "put",
        url: "https://api.spotify.com/v1/me/player/seek",
        data: {
          position_ms: 0
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        json: true
      };
      await axios(options);
    });
  }, 500);
  res.send("Party Time");
});

module.exports = app;
