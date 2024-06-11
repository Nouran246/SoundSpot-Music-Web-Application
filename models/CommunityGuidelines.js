const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Guidelines: {
      type: String,
      required: true,
    },
    
    },
  );