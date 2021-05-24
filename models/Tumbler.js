const { User } = require("./models/User");
const { Admin } = require("./models/Admin");
const mongoose = require("mongoose");

const tumblerSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
});

const Tumbler = mongoose.model("tumblers", tumblerSchema);

module.exports = { Tumbler };
