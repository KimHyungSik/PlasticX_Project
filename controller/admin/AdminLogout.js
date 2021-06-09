const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Admin } = require(path.resolve(modelsPath, "Admin"));

const callback = (req, res) => {
  Admin.findOneAndUpdate(
    { _id: req.body._id },
    { token: "" },
    (err, adminInfo) => {
      if (err) throw err;
      return adminInfo.status(200).send({
        success: true,
      });
    }
  );
};

module.exports = callback;
