// routes/authRoutes.js
const IssueReport = require("../models/IssueReport.js");
const express = require("express");
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");
const CommunityGuidelines = require("../models/Communityguidelinesschema");
const CompanyOverviewModel = require("../models/company");
const userController = require("../controllers/userController");
const authMiddleware = require("../controllers/authMiddleware");
const plan = require("../models/planing");
const router = express.Router();
const User = require("../models/Users.js");
const song = require("../models/song");
const Playlist = require("../models/Playlist.js");

router.post("/delete-users", userController.deleteUser);

// Route to fetch user data for editing
router.get("/edit-user/:id", authMiddleware, userController.getUserForEdit);

// Route to update user data
router.put("/edit-user/:id", authMiddleware, userController.updateUser);

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
router.get("/home", authMiddleware, (req, res) => {
  if (req.session.user) {
    res.render("AdminPart/home", {
      currentPage: "home",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/CommunityGuidelinesAdmin", authMiddleware, (req, res) => {
  if (req.session.user) {
    res.render("AdminPart/CommunityGuidelinesAdmin", {
      currentPage: "CommunityGuidelinesAdmin",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/CompanyOverview", authMiddleware, (req, res) => {
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

router.get("/premium", authMiddleware, async (req, res) => {
  if (req.session.user) {
    const plans = await plan.find();
    res.render("AdminPart/premium", {
      currentPage: "premium",
      user: req.session.user,
      plans: plans,
    });
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
router.get("/UserHomePage", async (req, res) => {
  try {
    const songs = await song.find(); // Fetch songs from the database
    if (req.session.user) {
      res.render("UserPart/UserHomePage", {
        currentPage: "UserHomePage",
        user: req.session.user,
        songs: songs  // Pass songs to the template context
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).send("Internal Server Error");
  }
});
// roaa
router.get("/song", async (req, res) => {
  try {
    const songs = await song.find();
    if (req.session.user) {
      res.render("AdminPart/song", {
        currentPage: "song",
        user: req.session.user,
        songs: songs
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/addplaylist", async (req, res) => {
  try {
    const songs = await song.find();
    if (req.session.user) {
      res.render("AdminPart/addplaylist", {
        currentPage: "addplaylist",
        user: req.session.user,
        songs: songs
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).send("Internal Server Error");
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
router.get("/Songs", async (req, res) => {
  try {
    const songs = await song.find(); // Fetch songs from the database
    if (req.session.user) {
      res.render("UserPart/Songs", {
        currentPage: "Songs",
        user: req.session.user,
        songs: songs  // Pass songs to the template context
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/managePlaylist", authMiddleware, async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('songs');
    if (req.session.user) {
      res.render("AdminPart/managePlaylist", {
        currentPage: "managePlaylist",
        user: req.session.user,
        playlists: playlists  
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/ManagePlaylists", async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('songs');
    if (req.session.user) {
      res.render("UserPart/ManagePlaylists", {
        currentPage: "ManagePlaylists",
        user: req.session.user,
        playlists: playlists  
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).send("Internal Server Error");
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

router.get("/playlistPage", async (req, res) => {
  try {
    const songs = await song.find();
    if (req.session.user) {
      res.render("UserPart/playlistPage", {
        currentPage: "playlistPage",
        user: req.session.user,
        songs: songs,
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/History", async(req, res) => {
  try {
    const songs = await song.find();
  if (req.session.user) {
    res.render("UserPart/History", {
      currentPage: "History",
      user: req.session.user,
      songs: songs,
    });
  } else {
    res.redirect("/");
  }
} catch (error) {
  console.error('Error fetching songs:', error);
  res.status(500).send("Internal Server Error");
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
router.get("/ManageUsers", authMiddleware, async (req, res) => {
  if (req.session.user) {
    const users = await User.find();
    res.render("AdminPart/ManageUsers", {
      currentPage: "ManageUsers",
      user: req.session.user,
      users: users,
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
router.get("/Badges", authMiddleware, (req, res) => {
  if (req.session.user) {
    res.render("AdminPart/Badges", {
      currentPage: "Badges",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/contactAdmin", authMiddleware, (req, res) => {
  if (req.session.user) {
    res.render("AdminPart/contactAdmin", {
      currentPage: "contactAdmin",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/free", authMiddleware, (req, res) => {
  if (req.session.user) {
    res.render("AdminPart/free", {
      currentPage: "free",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});
router.get("/ManageSongs", authMiddleware, (req, res) => {
  if (req.session.user) {
    res.render("AdminPart/ManageSongs", {
      currentPage: "ManageSongs",
      user: req.session.user,
    });
  } else {
    res.redirect("/");
  }
});

/* 
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
  */
router.get("/Reports", authMiddleware, async (req, res) => {
  if (req.session.user) {
    const reports = await IssueReport.find();
    res.render("AdminPart/Reports", {
      currentPage: "Reports",
      user: req.session.user,
      reports: reports,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/userProfile", authMiddleware, (req, res) => {
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
