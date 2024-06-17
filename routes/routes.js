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
const multer = require('multer'); // For handling file uploads
const bodyParser = require('body-parser');

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
const upload = multer({ dest: 'uploads/' }); // Ensure the 'uploads' directory exists
const router = express.Router();

function setupRoutes(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/", indexRoutes);
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);


  // Route for processing plan creation with file uploads
  app.post('/plans/process', upload.fields([{ name: 'adsVideo', maxCount: 1 }, { name: 'popupImage', maxCount: 1 }]), planController.createPlan);
  app.put('/plans/:id', planController.updatePlan);
  router.delete('plans/:id', async (req, res) => {
    try {
        const planId = req.params.id;
        const plan = await Plan.findByIdAndDelete(planId);
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json({ message: 'Plan deleted successfully' });
    } catch (error) {
        console.error('Error deleting plan:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}); 
router.get('/plans', async (req, res) => {
    try {
        
      const plans = await plan.find();
      console.log(plans);
      res.render("/premium", {
        plans
      })

      // res.json(plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      res.status(500).send("Internal Server Error");
    }
  });




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
module.exports = { setupRoutes };
