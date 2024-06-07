const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.render("index", {
    currentPage: "home",
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

module.exports = app;
