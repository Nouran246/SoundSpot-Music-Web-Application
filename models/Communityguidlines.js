const mongoose = require("mongoose");

const comuniSchema = new mongoose.Schema({
  Comguide: {
    type: String,
    required: true,
  },
});

const Comuni = mongoose.model('Comuni', comuniSchema);

module.exports = Comuni;