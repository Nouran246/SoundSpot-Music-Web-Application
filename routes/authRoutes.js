// routes/authRoutes.js
const express = require("express");
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");
const CommunityGuidelines = require("../models/Communityguidelinesschema");
const CompanyOverviewModel = require("../models/company");
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

router.get("/ManageUsers", (req, res) => {
  if (req.session.user) {
    res.render("ManageUsers", {
      currentPage: "ManageUsers",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});

// CommunityGuidelines
router.get("/CommunityGuidelines", async (req, res) => {
  if (req.session.user) {
    try {
      // Fetch community guidelines from the database
      const communityGuidelines = await CommunityGuidelines.findOne();

      if (!communityGuidelines) {
        return res.render("CommunityGuidelines", {
          currentPage: "CommunityGuidelines",
          error: "No community guidelines found.",
          Comguide: null, // Pass null or appropriate default value
          user: req.session.user,
        });
      }

      // Render the page with retrieved guidelines
      res.render("CommunityGuidelines", {
        currentPage: "CommunityGuidelines",
        Comguide: communityGuidelines.Comguide, // Ensure Comguide is passed here
        user: req.session.user,
      });
    } catch (error) {
      console.error('Error fetching community guidelines:', error);
      res.status(500).send("Internal Server Error");
    }
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


// CommunityGuidelines
router.get("/CompanyOverview", (req, res) => {
  if (req.session.user) {
    res.render("CompanyOverview", {
      currentPage: "CompanyOverview",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/contact", async (req, res) => {
  if (req.session.user) {
    try {
      // Fetch community guidelines from the database
      const companying = await CompanyOverviewModel.findOne();

      if (!companying) {
        return res.render("contact", {
          currentPage: "contact",
          error: "No community guidelines found.",
          COMPOVER: null, // Pass null or appropriate default value
          user: req.session.user,
        });
      }

      // Render the page with retrieved guidelines
      res.render("contact", {
        currentPage: "contact",
        COMPOVER: companying.COMPOVER, // Ensure Comguide is passed here
        user: req.session.user,
      });
    } catch (error) {
      console.error('Error fetching community guidelines:', error);
      res.status(500).send("Internal Server Error");
    }
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
// subscribtion
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
// Song palying
router.get("/Song", (req, res) => {
  if (req.session.user) {
    res.render("SongPlaying", {
      currentPage: "SongPlaying",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
// Song palying
router.get("/ManagePlaylists", (req, res) => {
  if (req.session.user) {
    res.render("ManagePlaylists", {
      currentPage: "ManagePlaylists",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
// Song palying
router.get("/Recap", (req, res) => {
  if (req.session.user) {
    res.render("Recap", {
      currentPage: "Recap",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
// Contact
router.get("/contact", (req, res) => {
  if (req.session.user) {
    res.render("Contact", {
      currentPage: "Contact",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
// history
router.get("/History", (req, res) => {
  if (req.session.user) {
    res.render("History", {
      currentPage: "History",
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
