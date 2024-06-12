// controllers/loginController.js
const User = require("../models/company.js");
const bcrypt = require("bcrypt");

const companyProcess = async (req, res) => {
  try {
    const { companyoverview } = req.body;

    // Check if Comguide is empty or null
    if (!companyoverview) {
      return res.render("company", {
        currentPage: "company",
        error: "Text cannot be empty.",
        companyoverview: null,
      });
    }

    const communityGuidelines = await Communityguidlines.findOne({ companyoverview });
    if (!communityGuidelines) {
      return res.render("company", {
        currentPage: "company",
        error: "company overview not found.",
        Comguide: null,
      });
    }

    // Compare input Comguide with the hashed value from the database
    const isMatch = await bcrypt.compare(companyoverview, communityGuidelines.companyoverview);
    if (!isMatch) {
      return res.render("community", {
        currentPage: "community",
        error: "You have entered the same thing; nothing can be changed.",
        companyoverview: null,
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
    companyProcess,
  };
  