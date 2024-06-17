const express = require("express");
const app = express();


app.get("/", (req, res) => {
  res.render("landing", {
    currentPage: "landing",
    user: req.session.user || "",
  });
});

// Index page (login/signup form)
app.get("/index", (req, res) => {
  // Check if user is logged in
  if (req.session.user) {
    // Redirect to another page (e.g., dashboard) if logged in
    res.redirect("/auth/UserHomePage"); // Replace with your desired redirect URL
  } else {
    // Render the index page if not logged in
    res.render("index", {
      currentPage: "index",
      user: req.session.user || "",
    });
  }
});
module.exports = app;
