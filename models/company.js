const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  COMPOVER: {
    type: String,
    required: true,
  },
});

const CompanyOverviewModel = mongoose.model('companyoverviews', companySchema);

module.exports = CompanyOverviewModel;