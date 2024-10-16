const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    unique:true,
  },
  Features: {
    type: [String], // Assuming Features is an array of strings
    validate: {
      validator: function(value) {
        // Check if the array contains at least one valid problem type
        return value && value.length > 0;
      },
      message: 'At least one valid problem type must be selected!'
    },
    required:true,
  },
  price: {
    type: String,
    required: true,
  },
  Duration: {
    type: String,
    enum: ['Free plan', '1 month', '3 months', '6 months', '1 year'],
    required: true,
  },
  videoFileId: { type: String, default: null }, // String to store filename
  photoFileId: { type: String, default: null }, // String to store filename
});

const Plan = mongoose.model('plans', planSchema);

module.exports = Plan;