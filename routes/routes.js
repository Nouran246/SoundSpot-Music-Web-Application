// routes/routes.js
const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const indexRoutes = require("./indexRoutes");
const communityController = require("../controllers/CommunityControllers");
const { verifyEmail } = require("../controllers/verifyController");
const companyController = require("../controllers/CompanyControllers");
const { reportIssue } = require("../controllers/reportController");
const planController = require("../controllers/planController");
const multer = require('multer'); // For handling file uploads
const bodyParser = require('body-parser');
const router = express.Router();
function setupRoutes(app) {
  app.use("/", indexRoutes);
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);

  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ dest: 'uploads/' });
app.post('/plans/process', upload.single('adsVideo'), async (req, res) => {
  try {
      const { title, features, price, duration, popupImage } = req.body;
      // Handle form data here, validate and save to database
      // Example database operation (using Mongoose for MongoDB):
      const newPlan = new Plan({
          title,
          features: JSON.parse(features), // Parse features array from JSON string
          price,
          duration,
          popupImage: req.file ? req.file.path : null // Handle file upload if included
      });
      const savedPlan = await newPlan.save();
      res.status(201).json(savedPlan); // Send response back to client
  } catch (error) {
      console.error('Error processing plan:', error);
      res.status(500).send('Error processing plan. Please try again.'); // Handle errors gracefully
  }
});
  // Route for processing community guidelines form submission
  app.post("/community/process", communityController.communityProcess);
  app.post("/company/process", companyController.companyprocess);

  // Route for email verification
  app.get("/auth/verify-email", verifyEmail);

  // Route for issue reporting
  app.post("/report/issue", reportIssue);
  router.post('/plans/process', planController.createPlan);

  app.use((req, res, next) => {
    res.render("404", {
      currentPage: "404",
      user: req.session.user === undefined ? "" : req.session.user,
    });
  });
}

module.exports = { setupRoutes };