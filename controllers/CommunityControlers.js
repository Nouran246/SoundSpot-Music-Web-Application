const Communityguidlines = require("../models/Communityguidlines.js");
const bcrypt = require("bcrypt");

const communityProcess = async (req, res) => {
  try {
    const { Comguide } = req.body;

    // Check if Comguide is empty or null
    if (!Comguide) {
      return res.render("community", {
        currentPage: "community",
        error: "Text cannot be empty.",
        Comguide: null,
      });
    }

    const communityGuidelines = await Communityguidlines.findOne({ Comguide });
    if (!communityGuidelines) {
      return res.render("community", {
        currentPage: "community",
        error: "Community guidelines not found.",
        Comguide: null,
      });
    }

    // Compare input Comguide with the hashed value from the database
    const isMatch = await bcrypt.compare(Comguide, communityGuidelines.Comguide);
    if (!isMatch) {
      return res.render("community", {
        currentPage: "community",
        error: "You have entered the same thing, nothing can be changed.",
        Comguide: null,
      });
    }

    req.session.user = communityGuidelines;
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
    communityProcess,
  };
  