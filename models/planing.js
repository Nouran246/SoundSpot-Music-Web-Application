const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Features: {
    type: [String],
  },
  price: {
    type: String,
    required: true,
  },
  Duration: {
    type: String,
    enum: ["Free plan",'1 month', '3 months', '6 months', '1 year'],
    required: true,
  },
  videoFileId: {
    type: mongoose.Schema.Types.ObjectId,  // Store GridFS file ID for video
  },
  photoFileId: {
    type: mongoose.Schema.Types.ObjectId,  // Store GridFS file ID for photo
  }
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
