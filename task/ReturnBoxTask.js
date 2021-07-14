const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "models");
const { ReturnBox } = require(path.resolve(modelsPath, "ReturnBox"));

const checkReturnBox = async (returnBoxID) => {
  let returnBox = await ReturnBox.findById(returnBoxID);
  // if it has been or more than 10 minutes since the last update, disconnect
  if (Date.now() - returnBox.lastUpdated >= 600000) {
    returnBox.isConnected = false;
    returnBox.save();
    const time = new Date(returnBox.lastUpdated).toString();
    console.log(
      "returnbox._id : " + returnBox._id + ", last updated : " + time
    );
    console.log("returnbox._id : " + returnBox._id + " [disconnected]...");
  } else {
    returnBox.isConnected = true;
    returnBox.save();
    const time = new Date(returnBox.lastUpdated).toString();
    console.log(
      "returnbox._id : " + returnBox._id + ", last updated : " + time
    );
    console.log("returnbox._id : " + returnBox._id + " [connected]...");
  }
};

// mongoDB에서 returnBox 리스트를 가져온다 ReturnBox.find
const callback = async () => {
  // save returnbox db list in var returnBoxes
  let returnBoxes = await ReturnBox.find();
  returnBoxes.forEach((item, index) => {
    // every 10 minutes, run checkReturnBox function to
    // setInterval(checkReturnBox, 5000, item._id);
    setInterval(checkReturnBox, 600000, item._id);
  });
};

module.exports = callback;
