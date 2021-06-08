const mongoose = require("mongoose");
const moment = require("moment");

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
    default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
});

const Tumbler = mongoose.model("tumblers", tumblerSchema);

module.exports = { Tumbler };
