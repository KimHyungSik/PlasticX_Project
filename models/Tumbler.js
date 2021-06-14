const mongoose = require("mongoose");

const tumblerSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  from_id: {
    type: mongoose.Types.ObjectId,
    default: null,
    required: false,
  },
  to_id: {
    type: mongoose.Types.ObjectId,
    default: null,
    required: false,
  },
  date: {
    type: Date,
  },
});

const Tumbler = mongoose.model("tumblers", tumblerSchema);

module.exports = { Tumbler };
