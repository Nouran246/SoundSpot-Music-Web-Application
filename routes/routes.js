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
const multer = require('multer'); // For handling file uploads
const bodyParser = require('body-parser');

const router = express.Router();

function setupRoutes(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/", indexRoutes);
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);

  const upload = multer({ dest: 'uploads/' });

  // Route for processing plan creation with file uploads
  app.post('/plans/process', upload.fields([{ name: 'adsVideo', maxCount: 1 }, { name: 'popupImage', maxCount: 1 }]), planController.createPlan);

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
