// CompanyController.js
const CompanyOverviewModel = require("../models/company.js");

const companyprocess = async (req, res) => {
  try {
    const { COMPOVER } = req.body;

    // Check if COMPOVER is empty or null
    if (!COMPOVER) {
      return res.render("CompanyOverview", {
        currentPage: "CompanyOverview",
        error: "Text cannot be empty.",
        COMPOVER: null,
      });
    }

    // Find existing company overview or create a new one
    let companyOverview = await CompanyOverviewModel.findOne();
    if (!companyOverview) {
      // Create new company overview if none exist
      companyOverview = new CompanyOverviewModel({ COMPOVER });
    } else {
      // Update existing company overview
      companyOverview.COMPOVER = COMPOVER;
    }

    // Save the updated company overview
    await companyOverview.save();

    // Redirect to home page or appropriate route
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const displaycompany = async (req, res) => {
  try {
    // Retrieve the company overview from the database
    const companyOverview = await CompanyOverviewModel.findOne();

    // Check if data exists
    if (!companyOverview) {
      return res.render("CompanyOverview", {
        currentPage: "CompanyOverview",
        error: "No company overview found.",
        COMPOVER: null,
      });
    }

    // Render the page with the retrieved data
    res.render("CompanyOverview", {
      currentPage: "CompanyOverview",
      COMPOVER: companyOverview.COMPOVER,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  companyprocess,
  displaycompany
};