
const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
   
  },
  Features:{
    type: [String],
  },
  price: {
    type: String,
    required: true,
  },
  Duration: {
    type: String,
    enum: ["Free plan",'1 month', '3 months', '6 months', '1 year'], // Example durations
    required: true,

    
  },
  uploadvid: {
    type: String,
   
  },
  uploadpopup: {
    type: String,
  }
  
});

const plans = mongoose.model('plans', planSchema);

module.exports = plans;
