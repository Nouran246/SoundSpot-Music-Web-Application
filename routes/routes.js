// routes/routes.js
const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const indexRoutes = require("./indexRoutes");
const communityController = require("../controllers/CommunityControllers");
const { verifyEmail } = require("../controllers/verifyController");
const companyController = require("../controllers/CompanyControllers");
const { reportIssue, getAllReports } = require("../controllers/reportController");
const planController = require("../controllers/planController");
const plan = require("../models/planing");
const song = require("../models/song");
const multer = require('multer'); // For handling file uploads
const bodyParser = require('body-parser');
const songController = require("../controllers/songController");
const playlistController=require("../controllers/playlistController");

const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure the 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Add original extension
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

function setupRoutes(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/", indexRoutes);
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.post('/songs/upload', upload.fields([
    { name: 'songFileId', maxCount: 1 },
    { name: 'imageFileId', maxCount: 1 }
  ]), songController.uploadSong);
  app.post('/addplaylist/upload', upload.fields([
    { name: 'imagePlaylist', maxCount: 1 }
  ]), playlistController.uploadPlaylist);


  // Route for processing plan creation with file uploads
  app.post('/plans/process', upload.fields([{ name: 'adsVideo', maxCount: 1 }, { name: 'popupImage', maxCount: 1 }]), planController.createPlan);
  app.post('/auth/delete-plan/:title', planController.deletePlan);
  router.put('/plans/:title', planController.updatePlan);
  router.get('/plans', async (req, res) => {
    try {
        
      const plans = await plan.find();
      console.log(plans);
      res.render("/premium", {
        plans: plans,
      })

      // res.json(plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      res.status(500).send("Internal Server Error");
    }
  });
  router.get('/songs', async (req, res) => {
    try {
        
      const songs = await song.find();
      console.log(songs);
      res.render("/UserHomePage", {
       songs
      })

      // res.json(plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get('/song', songController.getSongs);
  app.get('/managePlaylist', playlistController.getPlaylist);
  router.get('/addplaylist', async (req, res) => {
    try {
        
      const songs = await song.find();
      console.log(songs);
      res.render("/addplaylist", {
       songs
      })
    } catch (error) {
      console.error('Error fetching plans:', error);
      res.status(500).send("Internal Server Error");
    }
  });
  router.delete('/song/:id', songController.deleteSong);
  app.post('/createPlan', planController.createPlan);

  app.get('/plans/:id', planController.getPlanById);
  // Route for processing community guidelines form submission
  app.post("/community/process", communityController.communityProcess);
  app.post("/company/process", companyController.companyprocess);

  // Route for email verification
  app.get("/auth/verify-email", verifyEmail);

  // Route for issue reporting
  app.post("/report/issue", reportIssue);

  // Fetch all reports
  app.get("/report/issue", getAllReports);

  // Default route to landing page
  app.use((req, res, next) => {
    res.render("404", {
      currentPage: "404",
      user: req.session.user === undefined ? "" : req.session.user,
    });
  });
}

router.get('/plans/:planTitle', async (req, res) => {
  try {
      const planTitle = req.params.planTitle;
      console.log(`Fetching plan with title: ${planTitle}`); // Log the plan title being fetched
      const plan = await Plan.findOne({ Title: planTitle }); // Adjust the query as per your schema
      if (!plan) {
          console.error(`Plan not found: ${planTitle}`);
          return res.status(404).json({ error: 'Plan not found' });
      }
      res.json(plan);
  } catch (error) {
      console.error('Error fetching plan data:', error); // Log the error
      res.status(500).json({ error: 'Failed to fetch plan data' });
  }
});

// Update plan data based on planTitle
router.put('/auth/plans/:planTitle', async (req, res) => {
  try {
      const planTitle = req.params.planTitle;
      const updatedPlanData = req.body;
      
      console.log(`Updating plan with title: ${planTitle}`); // Log the plan title being updated
      const plan = await Plan.findOneAndUpdate({ Title: planTitle }, updatedPlanData, { new: true }); // Adjust the query as per your schema
      if (!plan) {
          console.error(`Plan not found: ${planTitle}`);
          return res.status(404).json({ error: 'Plan not found' });
      }
      res.json(plan);
  } catch (error) {
      console.error('Error updating plan data:', error); // Log the error
      res.status(500).json({ error: 'Failed to update plan data' });
  }
});

module.exports = { setupRoutes };