const Plan = require("../models/planing");

// GET all plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    console.log(plans);
    //res.render("plans/index", { plans, user: req.session.user });
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
  const adsVideo = req.files.adsVideo ? req.files.adsVideo[0] : null;
  const popupImage = req.files.popupImage ? req.files.popupImage[0] : null;

  try {
    const newPlan = new Plan({
      Title: title,
      Features: Array.isArray(features) ? features : [features],
      price:price,
      Duration: duration,
      videoFileId: adsVideo ? adsVideo.filename : null,
      photoFileId: popupImage ? popupImage.filename : null,
    });

    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Update an existing plan
exports.updatePlan = async (req, res) => {
  const { id } = req.params;
  const { title, features, price, duration } = req.body;
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      id,
      { Title: title, Features: Array.isArray(features) ? features : [features], price, Duration: duration },
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
