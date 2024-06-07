const express = require("express");
const userController = require("../controllers/userController");
const app = express();
// Add a middleware to check if the user is logged in
app.use((req, res, next) => {
  if (req.session.user !== undefined) {
    next();
  } else {
    res.render("404", {
      user: req.session.user === undefined ? "" : req.session.user,
      currentPage: "404",
    });
  }
});
// Define user-related routes here...
app.get("/display", userController.displayAllUsers);

module.exports = app;
