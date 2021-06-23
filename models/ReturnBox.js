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
    required: true,
    //required: true,
  },

  isConnected:
  {
    type: Boolean,
    default: false,
    required: true,
  },

  isWorking:
  {
    type: Boolean,
    default: false,
    required: true,
    //required: true,
  },
  
  lastUpdated: 
  { 
    type: Date, 
    default: Date.now 
  }, 

  location:
  {
    type:
    {
      type: String,
      enum: ['Point'],
      required: true
    },

    coordindates:
    {
      type: [Number],
      required: true
    }
  }
});

// model and schema
const ReturnBox = mongoose.model("returnbox", returnBoxSchema);
module.exports = { ReturnBox };
