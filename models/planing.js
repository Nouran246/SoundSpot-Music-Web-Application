const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Features: [String],
  price: {
    type: String,
    required: true,
  },
  Duration: {
    type: String,
    enum: ['Free plan', '1 month', '3 months', '6 months', '1 year'],
    required: true,
  },
  videoFileId: mongoose.Schema.Types.ObjectId,
  photoFileId: mongoose.Schema.Types.ObjectId,
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
