const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
});

const Owner = mongoose.model("owners", ownerSchema);

module.exports = { Owner };
