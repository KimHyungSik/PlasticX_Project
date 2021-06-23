// returns the whole schema

// mongoose is an interface to mongodb      
const mongoose = require("mongoose");

const returnBoxSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,

  // full state > empty state
  isFull: 
  {
    type: Boolean,
    // default is false because a new returnbox would be empty.
    default: false,
    required: false,
    //required: true,
  },

  isConnected:
  {
    type: Boolean,
    default: false,
    required: false,
  },

  isWorking:
  {
    type: Boolean,
    default: false,
    required: false,
    //required: true,
  },
  
  lastUpdated: 
  { 
    type: Date, 
    default: Date.now,
    required: false
  }, 

  location:
  {
    type:
    {
      type: String,
      enum: ['Point'],
      required: false
    },

    coordindates:
    {
      type: [Number],
      required: false
    }
  }
});

// model and schema
const ReturnBox = mongoose.model("returnbox", returnBoxSchema);
module.exports = { ReturnBox };
