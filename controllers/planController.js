// controllers/planController.js
const Plan = require("../models/planing");

// GET all plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.render("plans/index", { plans, user: req.session.user });
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).send("Internal Server Error");
  }
};

// GET plan by ID
exports.getPlanById = async (req, res) => {
  const { id } = req.params;
  try {
    const plan = await Plan.findById(id);
    if (!plan) {
      return res.status(404).render("404", { currentPage: "404", user: req.session.user });
    }
    res.render("plans/show", { plan, user: req.session.user });
  } catch (error) {
    console.error(`Error fetching plan with ID ${id}:`, error);
    res.status(500).send("Internal Server Error");
  }
};

// Create a new plan
exports.createPlan = async (req, res) => {
    const { title, features, price, duration } = req.body;
    const { adsVideo, popupImage } = req.files; // Handle file uploads if necessary
  
    try {
      const newPlan = await Plan.create({
        Title: title,
        Features: features ? Array.isArray(features) ? features : [features] : [],
        price: price,
        Duration: duration,
        videoFileId: adsVideo ? adsVideo.id : null,
        photoFileId: popupImage ? popupImage.id : null,
      });
      res.status(201).redirect(`/plans/${newPlan._id}`);
    } catch (error) {
      console.error("Error creating plan:", error);
      res.status(500).send("Internal Server Error");
    }
  };

// Update an existing plan
exports.updatePlan = async (req, res) => {
  const { id } = req.params;
  const { Title, Features, price, Duration } = req.body;
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      id,
      { Title, Features, price, Duration },
      { new: true }
    );
    if (!updatedPlan) {
      return res.status(404).render("404", { currentPage: "404", user: req.session.user });
    }
    res.redirect(`/plans/${updatedPlan._id}`);
  } catch (error) {
    console.error(`Error updating plan with ID ${id}:`, error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete a plan
exports.deletePlan = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPlan = await Plan.findByIdAndDelete(id);
    if (!deletedPlan) {
      return res.status(404).render("404", { currentPage: "404", user: req.session.user });
    }
    res.redirect("/plans");
  } catch (error) {
    console.error(`Error deleting plan with ID ${id}:`, error);
    res.status(500).send("Internal Server Error");
  }
};

