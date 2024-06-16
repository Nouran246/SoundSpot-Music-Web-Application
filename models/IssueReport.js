// models/IssueReport.js
const mongoose = require("mongoose");

const issueReportSchema = new mongoose.Schema({
  problemTypes: {
    type: [String],
    validate: {
      validator: function(v) {
        if (v.length === 0) {
          return false;
        }
        const acceptableValues = ['images', 'spelling', 'links', 'info'];
        return v.every(value => acceptableValues.includes(value));
      },
      message: props => `At least one valid problem type must be selected!`
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
  status: {
    type: String,
    enum: ['resolved', 'unresolved'],
    default: 'unresolved',
  }
}, {
  timestamps: true,
});

const IssueReport = mongoose.model('IssueReport', issueReportSchema);

module.exports = IssueReport;
