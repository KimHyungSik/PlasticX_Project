const mongoose = require("mongoose");
const { Schema } = mongoose;

const { User } = require("./User");
const { Tumbler } = require("./Tumbler");
const { ReturnBox } = require("./ReturnBox");
const { Owner } = require("./Owner");

const historySchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Types.ObjectId,
    ref: User,
    require: true,
  },
  tumbler: {
    type: mongoose.Types.ObjectId,
    ref: Tumbler,
    require: true,
  },
  returnBox: {
    type: mongoose.Types.ObjectId,
    ref: ReturnBox,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: Owner,
  },
  date: {
    type: Date,
  },
});

const History = mongoose.model("histories", historySchema);

module.exports = { History };
