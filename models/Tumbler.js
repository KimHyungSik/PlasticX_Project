const mongoose = require("mongoose");
const { Schema } = mongoose;

const { TumblerModel } = require("./TumblerModel");
const { Owner } = require("./Owner");

const tumblerSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  from_id: {
    type: mongoose.Types.ObjectId,
    ref: Owner,
    default: null,
    required: false,
  },
  to_id: {
    type: mongoose.Types.ObjectId,
    default: null,
    required: false,
  },
  state: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
  model: {
    type: mongoose.Types.ObjectId,
    ref: TumblerModel,
    default: null,
    required: false,
  },
});

const Tumbler = mongoose.model("tumblers", tumblerSchema);

module.exports = { Tumbler };
