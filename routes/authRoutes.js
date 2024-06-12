const express = require("express");
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");
const signupController = require("../controllers/CommunityControlers");
const signupController = require("../controllers/CompanyControllers");

const app = express();

app.get("/login", (req, res) => {
  res.render("login", {
    currentPage: "login",
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

app.get("/signup", (req, res) => {
  res.render("signup", {
    currentPage: "signup",
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

app.post("/login", loginController.loginProcess);
app.post("/signup", signupController.registrationProcess);

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
<<<<<<< Updated upstream
=======
// CommunityGuidelines
router.get("/CommunityGuidelines", (req, res) => {
  if (req.session.user) {
    res.render("CommunityGuidelines", {
      currentPage: "CommunityGuidelines",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/Subscription", (req, res) => {
  if (req.session.user) {
    res.render("Subscription", {
      currentPage: "Subscription",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/Plan", (req, res) => {
  if (req.session.user) {
    res.render("Plan", {
      currentPage: "Plan",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
// Process login
router.post("/login", loginController.loginProcess);
>>>>>>> Stashed changes

// Add the logout route
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie("connect.sid");
    res.redirect("/auth/login");
  });
});





module.exports = app;
