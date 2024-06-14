// models/IssueReport.js
const mongoose = require("mongoose");

const issueReportSchema = new mongoose.Schema({
  problemTypes: {
    type: [String],
    enum: ['images', 'spelling', 'links', 'info'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: props => `At least one problem type must be selected!`
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
  },
  confirmEmail: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
  },
  comment: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

const IssueReport = mongoose.model('IssueReport', issueReportSchema);

module.exports = IssueReport;
