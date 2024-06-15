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
const router = express.Router();
function setupRoutes(app) {
  app.use("/", indexRoutes);
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);

  // Route for processing community guidelines form submission
  app.post("/community/process", communityController.communityProcess);
  app.post("/company/process", companyController.companyprocess);

  // Route for email verification
  app.get("/auth/verify-email", verifyEmail);

  // Route for issue reporting
  app.post("/report/issue", reportIssue);
  router.get("/plans", planController.getAllPlans);           // Show all plans
router.get("/plans/:id", planController.getPlanById);      // Show a specific plan
router.post("/plans", planController.createPlan);           // Create a new plan
router.put("/plans/:id", planController.updatePlan);        // Update a plan
router.delete("/plans/:id", planController.deletePlan); 

  app.use((req, res, next) => {
    res.render("404", {
      currentPage: "404",
      user: req.session.user === undefined ? "" : req.session.user,
    });
  });
}

module.exports = { setupRoutes };
