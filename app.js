const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const routes = require("./routes/routes");
const api = require("./routes/api");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: "true",
    secret: "secret",
  })
);

app.use(routes);
app.use(api);

// 404 Handler
app.get("*", (req, res) => {
  res.render("error",{title:"404 "} )
})

// Internal Server Error Handler
app.use(function(err, req, res, next) {
  console.error(err)
  res.status(500).json({
    status: 'fail',
    errors: err.message
  })
})

module.exports = app;
