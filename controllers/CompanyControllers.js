const CompanyOverviewModel = require("../models/Company.js");

const companyprocess = async (req, res) => {
  try {
    const { COMPOVER } = req.body;

    // Check if COMPOVER is empty or null
    if (!COMPOVER) {
      return res.render("Companyover", {
        currentPage: "Companyover",
        error: "Text cannot be empty.",
        COMPOVER: null,
      });
    }

    // Find existing company overview or create a new one
    let companyOverview = await CompanyOverviewModel.findOne();
    if (!companyOverview) {
      // Create new company overview if none exist
      companyOverview = new CompanyOverviewModel({ companyoverview: COMPOVER });
    } else {
      // Update existing company overview
      companyOverview.companyoverview = COMPOVER;
    }

    // Save the updated company overview
    await companyOverview.save();

    // Update session user (example, make sure it fits your application logic)
    req.session.user = companyOverview;

    // Redirect to home page or appropriate route
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  companyprocess,
};
