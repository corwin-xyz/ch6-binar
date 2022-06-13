const express = require("express");
const app = express();
const {
  User_game,
  User_game_biodata,
  User_game_history,
} = require("../models");


// CREATE /user
app.post("/users", (req, res) =>
  User_game.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((user_game) => {
      User_game_biodata.create({
        user_id: user_game.get("id"),
      });
      User_game_history.create({
        user_id: user_game.get("id"),
      });
    })
    .then((user) => res.status(201).json(user))
    .catch(() => res.status(422).send("Cannot create user"))
);

// READ /user
app.get("/users", (req, res) =>
  User_game.findAll({
    include: [
      {
        model: User_game_biodata,
      },
      {
        model: User_game_history,
      },
    ],
  }).then((user) =>
    user.length == 0
      ? res.status(200).send("No users yet!")
      : res.status(200).json(user)
  )
);

// READ /user/:id
app.get("/users/:id", (req, res) =>
  User_game.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User_game_biodata,
      },
      {
        model: User_game_history,
      },
    ],
  }).then((user) =>
    user ? res.status(200).json(user) : res.status(200).send("ID not found")
  )
);

// Update /users/edit/:id
app.put("/users/edit/:id", (req, res) =>
  User_game.update(
    {
      username: req.body.username,
      password: req.body.password,
    },
    { where: { id: req.params.id } }
  )
    .then(() => {
      User_game_biodata.update(
        {
          full_name: req.body.full_name,
          email: req.body.email,
        },
        { where: { user_id: req.params.id } }
      );
      User_game_history.update(
        {
          win: req.body.win,
          lose: req.body.lose,
        },
        { where: { user_id: req.params.id } }
      );
    })
    .then((user) => res.status(201).json(user))
    .catch(() => res.status(422).send("Cannot update user"))
);

// Delete /users/delete/:id
app.delete("/users/delete/:id", (req, res) =>
  User_game.destroy({ where: { id: req.params.id } })
    .then(() =>
      res.status(201).json({
        message: `Users id of ${req.params.id} has been deleted!`,
      })
    )
    .catch(() => res.status(422).send("Cannot delete the user id"))
);

module.exports = app;
