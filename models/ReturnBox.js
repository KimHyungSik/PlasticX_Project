// returns the whole schema

// mongoose is an interface to mongodb
const mongoose = require("mongoose");

const returnBoxSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,

  tumblerCount: {
    type: Number,
    default: 0,
    required: false,
  },

  isConnected: {
    type: Boolean,
    default: false,
    required: false,
  },

  isWorking: {
    type: Boolean,
    default: false,
    required: false,
    //required: true,
  },

  lastUpdated: {
    type: Date,
    default: Date.now(),
    required: false,
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: false,
    },

    coordindates: {
      type: [Number],
      default: ["37.492584", "127.005157"],
      required: false,
    },
  },
});

// model and schema
const ReturnBox = mongoose.model("returnbox", returnBoxSchema);
module.exports = { ReturnBox };
