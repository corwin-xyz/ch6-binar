const express = require("express");
const app = express.Router();

// Games Page
app.get("/games", (req, res, next) =>
  res.render("games", {
    title: "PLAY GAME",
    name: req.query.user,
  })
);

module.exports = app;
