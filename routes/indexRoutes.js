const express = require("express");
const app = express();
const authMiddleware = require("../controllers/authMiddleware");

app.get("/", (req, res) => {
  res.render("landing", {
    currentPage: "landing",
    user: req.session.user === undefined ? "" : req.session.user,
  });
});
app.get("/index",(req, res) => {
  res.render("index", {
    currentPage: "index",
    user: req.session.user === undefined ? "" : req.session.user,
  });
});
module.exports = app;
