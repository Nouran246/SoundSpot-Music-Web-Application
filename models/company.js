const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyoverview: {
    type: String,
    required: true,
  },
});

const CompanyOverviewModel = mongoose.model('CompanyOverview', companySchema);

module.exports = CompanyOverviewModel;