const mongoose = require("mongoose");

const comuniSchema = new mongoose.Schema({
  Comguide: {
    type: String,
    required: true,
  },
});

// Optionally, you can create a model from the schema:
const Comuni = mongoose.model('Comuni', comuniSchema);

module.exports = Comuni;