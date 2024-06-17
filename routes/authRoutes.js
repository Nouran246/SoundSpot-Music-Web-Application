// routes/authRoutes.js
const express = require("express");
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");
const CommunityGuidelines = require("../models/Communityguidelinesschema");
const CompanyOverviewModel = require("../models/company");
const authMiddleware = require("../controllers/authMiddleware");
const plan = require("../models/planing");
const router = express.Router();

// Home page (landing page)
router.get("/", (req, res) => {
  res.render("landing", {
    currentPage: "landing",
    user: req.session.user || "",
  });
});

router.get("/index", (req, res) => {
  res.render("index", {
    currentPage: "index",
    user: req.session.user || "",
  });
});
router.get("/home", authMiddleware,(req, res) => {
  if (req.session.user) {
    res.render("AdminPart/home", {
      currentPage: "home",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/CommunityGuidelinesAdmin", authMiddleware,(req, res) => {
  if (req.session.user) {
    res.render("AdminPart/CommunityGuidelinesAdmin", {
      currentPage: "CommunityGuidelinesAdmin",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/CompanyOverview", authMiddleware,(req, res) => {
  if (req.session.user) {
    res.render("AdminPart/CompanyOverview", {
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
        return res.render("UserPart/contact", {
          currentPage: "contact",
          error: "No community guidelines found.",
          COMPOVER: null, // Pass null or appropriate default value
          user: req.session.user,
        });
      }

      // Render the page with retrieved guidelines
      res.render("UserPart/contact", {
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

router.get("/premium", authMiddleware, async(req, res) => {
  if (req.session.user) {
    const plans = await plan.find();
   
   
    res.render("AdminPart/premium", {
      currentPage: "premium",
      user: req.session.user,
      plans
    }
  );
 
  } else {
    res.redirect("/");
  }
});



router.get('/plans', async (req, res) => {
  try {
    const plans = await plan.find();
    console.log(plans);
    res.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/Plans", (req, res) => {
  if (req.session.user) {
    res.render("UserPart/Plans", {
      currentPage: "Plans",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/Subscription", (req, res) => {
  if (req.session.user) {
    res.render("UserPart/Subscription", {
      currentPage: "Subscription",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/UserHomePage", (req, res) => {
  if (req.session.user) {
    res.render("UserPart/UserHomePage", {
      currentPage: "UserHomePage",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/CommunityGuidelines", async (req, res) => {
  if (req.session.user) {
    try {
      // Fetch community guidelines from the database
      const communityGuidelines = await CommunityGuidelines.findOne();

      if (!communityGuidelines) {
        return res.render("UserPart/CommunityGuidelines", {
          currentPage: "CommunityGuidelines",
          error: "No community guidelines found.",
          Comguide: null, // Pass null or appropriate default value
          user: req.session.user,
        });
      }

      // Render the page with retrieved guidelines
      res.render("UserPart/CommunityGuidelines", {
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
router.get("/Songs", (req, res) => {
  if (req.session.user) {
    res.render("UserPart/Songs", {
      currentPage: "Songs",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});


router.get("/SongPlaying", (req, res) => {
  if (req.session.user) {
    res.render("UserPart/SongPlaying", {
      currentPage: "SongPlaying",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/ManagePlaylists", (req, res) => {
  if (req.session.user) {
    res.render("UserPart/ManagePlaylists", {
      currentPage: "ManagePlaylists",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/Recap", (req, res) => {
  if (req.session.user) {
    res.render("UserPart/Recap", {
      currentPage: "Recap",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/Report", (req, res) => {
  if (req.session.user) {
    res.render("UserPart/Report", {
      currentPage: "Report",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/contact", (req, res) => {
  if (req.session.user) {
    res.render("UserPart/Contact", {
      currentPage: "Contact",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/playlistPage", (req, res) => {
  if (req.session.user) {
    res.render("UserPart/playlistPage", {
      currentPage: "playlistPage",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/History", (req, res) => {
  if (req.session.user) {
    res.render("UserPart/History", {
      currentPage: "History",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/addsong", authMiddleware, (req, res) => {
  if (req.session.user) {
    res.render("AdminPart/addsong", {
      currentPage: "addsong",
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
      return res.redirect("/index");
    }
    res.clearCookie("connect.sid");
    res.redirect("/index");
  });
});

router.get("/ManageUsers", authMiddleware,(req, res) => {
  if (req.session.user) {
    res.render("AdminPart/ManageUsers", {
      currentPage: "ManageUsers",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/managePlaylist", authMiddleware,(req, res) => {
  if (req.session.user) {
    res.render("AdminPart/managePlaylist", {
      currentPage: "managePlaylist",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/addplaylist", authMiddleware, (req, res) => {
  if (req.session.user) {
    res.render("AdminPart/addplaylist", {
      currentPage: "addplaylist",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/Badges", authMiddleware,(req, res) => {
  if (req.session.user) {
    res.render("AdminPart/Badges", {
      currentPage: "Badges",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/contactAdmin",authMiddleware, (req, res) => {
  if (req.session.user) {
    res.render("AdminPart/contactAdmin", {
      currentPage: "contactAdmin",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/free",authMiddleware, (req, res) => {
  if (req.session.user) {
    res.render("AdminPart/free", {
      currentPage: "free",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/ManageSongs",authMiddleware, (req, res) => {
  if (req.session.user) {
    res.render("AdminPart/ManageSongs", {
      currentPage: "ManageSongs",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/ManageUsers",authMiddleware, (req, res) => {
  if (req.session.user) {
    res.render("AdminPart/ManageUsers", {
      currentPage: "ManageUsers",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/Reports", authMiddleware,(req, res) => {
  if (req.session.user) {
    res.render("AdminPart/Reports", {
      currentPage: "Reports",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/song", authMiddleware,(req, res) => {
  if (req.session.user) {
    res.render("AdminPart/song", {
      currentPage: "song",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/userProfile", authMiddleware,(req, res) => {
  if (req.session.user) {
    res.render("AdminPart/userProfile", {
      currentPage: "userProfile",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});



module.exports = router;
