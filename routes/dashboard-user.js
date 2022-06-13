const express = require("express");
const app = express.Router();
const { User_game, User_game_biodata } = require("../models");

app.get("/dashboard-user", (req, res) => {
  const msg = req.query.msg;
  const username = req.query.user;
  User_game.findOne({
    where: {
      username: username,
    },
  }).then((result) => {
    result
      ? User_game_biodata.findOne({
          where: {
            user_id: result.get("id"),
          },
        }).then((user) =>
          res.status(200).render("dashboard-user", {
            title: "Dashboard User",
            user,
            msg: msg,
            username: username,
          })
        )
      : res.status(200).redirect("/");
  });
});


module.exports = app;
