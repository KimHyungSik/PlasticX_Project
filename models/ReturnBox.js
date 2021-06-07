const mongoose = require("mongoose");

const returnBoxSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,

  // full state > empty state
  isFull: 
  {
    type: Boolean
  },

  isConnected:
  {
    type: Boolean
  },

  isWorking:
  {
    type: Boolean
  },
  
  location:
  {
    // name of location (cafe)
    name: String,
    // point is a simple GeoJSON structure
    type:
    {
      type: String,
      enum: ['Point'],
      required: true
    },

    coordinates:
    {
      type: [Number],
      required: true
    }
  },

});

const ReturnBox = mongoose.model("returnbox", ReturnBox);
module.exports = { ReturnBox };
