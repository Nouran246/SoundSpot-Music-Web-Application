const mongoose = require("mongoose");

const company = new mongoose.Schema({
  companyoverview: {
    type: String,
    required: true,
  },
});

// Optionally, you can create a model from the schema:
const companyover = mongoose.model('Company Overview', Company);

module.exports = companyover;