const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
  width: { type: Number, default: 200 },
  height: { type: Number, default: 200 },
  _id: false,
});

const modelSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 10,
  },
  image: {
    type: imageSchema,
    default: {},
  },
  _id: false,
});

const tumblerSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  design: {
    type: modelSchema,
    default: {},
  },
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
  state: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
});

const Tumbler = mongoose.model("tumblers", tumblerSchema);

module.exports = { Tumbler };
