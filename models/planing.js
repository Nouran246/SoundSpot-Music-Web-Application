const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Features: {
    type: [String],
    validate: {
      validator: function(v) {
        if (v.length === 0) {
          return false;
        }
        const acceptableValues = ['ads-free', 'pop-upfree', 'freeplan'];
        return v.every(value => acceptableValues.includes(value));
      },
      message: props => `At least one valid problem type must be selected!`
    },
    required: true,
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
  videoFileId: mongoose.Schema.Types.ObjectId,
  photoFileId: mongoose.Schema.Types.ObjectId,
});

const Plan = mongoose.model('plans', planSchema);

module.exports = Plan;
