const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  telephone: {
    type: String,
    unique: 1,
    required: true,
  },
  max_cup: {
    type: Number,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
});

const Owner = mongoose.model("owners", ownerSchema);

module.exports = { Owner };
