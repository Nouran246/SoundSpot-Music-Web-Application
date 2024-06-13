// routes/authRoutes.js
const express = require("express");
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");
const router = express.Router();

// Home page
router.get("/", (req, res) => {
  res.render("index", {
    currentPage: "index",
    user: req.session.user || "",
  });
});

// User home page
router.get("/user-home", (req, res) => {
  if (req.session.user) {
    res.render("UserHomePage", {
      currentPage: "UserHomePage",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
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
router.get("/CommunityGuidelinesAdmin", (req, res) => {
  if (req.session.user) {
    res.render("CommunityGuidelinesAdmin", {
      currentPage: "CommunityGuidelinesAdmin",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/home", (req, res) => {
  if (req.session.user) {
    res.render("home", {
      currentPage: "home",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/Plans", (req, res) => {
  if (req.session.user) {
    res.render("Plans", {
      currentPage: "Plans",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
// Songs
router.get("/Songs", (req, res) => {
  if (req.session.user) {
    res.render("Songs", {
      currentPage: "Songs",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
// Process login
router.post("/login", loginController.loginProcess);

// Process signup
router.post("/signup", signupController.registrationProcess);

// Logout route
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

module.exports = router;
