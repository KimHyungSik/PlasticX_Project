const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { User } = require(path.resolve(modelsPath, "User"));

const callback = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" },
    (err, userInfo) => {
      if (err) return res.json({
        success: false,
        err
      });
      return res.status(200).send({
        success: true,
      });
    }
  );
};

module.exports = callback;
