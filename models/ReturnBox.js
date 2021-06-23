// returns the whole schema

// mongoose is an interface to mongodb
const mongoose = require("mongoose");

const returnBoxSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,

  // full state > empty state
  isFull: 
  {
    type: Boolean,
    default: true,
    required: false,
    //required: true,
  },

  isConnected:
  {
    type: Boolean,
    default: true,
    required: false,
    //required: true,
    
  },

  isWorking:
  {
    type: Boolean,
    default: true,
    required: false,
    //required: true,
  },
  
  /***
   *lastUpdated: 
  { 
    type: Date, 
    default: Date.now 
  }, 
   * 
   */
  

  
/**
 * 
 * location:
  {
    // name of location (cafe)
    //name: String,
    //required: true,

    // point is a simple GeoJSON structure
    type:
    {
      type: String,
      enum: ['Point'],
      //required: true
    },

    coordinates:
    {
      type: [Number],
      //required: true
    }
  }
*/
});

// model and schema
const ReturnBox = mongoose.model("returnbox", returnBoxSchema);
module.exports = { ReturnBox };
