const mongoose = require("mongoose");
const { Schema } = mongoose;

const modelSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    maxlength: 10,
  },
});

const TumblerModel = mongoose.model("tumblermodels", modelSchema);

module.exports = { TumblerModel };
