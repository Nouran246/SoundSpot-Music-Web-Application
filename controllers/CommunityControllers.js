const CommunityGuidelines = require("../models/Communityguidelinesschema.js");

const communityProcess = async (req, res) => {
  try {
    const { Comguide } = req.body;

    // Check if Comguide is empty or null
    if (!Comguide) {
      return res.render("CommunityGuidelinesAdmin", {
        currentPage: "CommunityGuidelinesAdmin",
        error: "Text cannot be empty.",
        Comguide: null,
      });
    }

    // Check if the community guidelines already exist
    let communityGuidelines = await CommunityGuidelines.findOne();
    if (!communityGuidelines) {
      // Create new community guidelines if none exist
      communityGuidelines = new CommunityGuidelines({ Comguide });
    } else {
      // Update existing community guidelines
      communityGuidelines.Comguide = Comguide;
    }

    // Save the updated guidelines
    await communityGuidelines.save();

    req.session.user = communityGuidelines;
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


// Function to handle displaying the community guidelines
const displayCommunityGuidelines = async (req, res) => {
  try {
    // Retrieve the community guidelines from the database
    const communityGuidelines = await CommunityGuidelines.findOne();

    // Check if data exists
    if (!communityGuidelines) {
      return res.render("CommunityGuidelines", {
        currentPage: "CommunityGuidelines",
        error: "No community guidelines found.",
        Comguide: null,
      });
    }

    // Render the page with the retrieved data
    res.render("CommunityGuidelines", {
      currentPage: "CommunityGuidelines",
      Comguide: communityGuidelines.Comguide,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  communityProcess,
  displayCommunityGuidelines,
};