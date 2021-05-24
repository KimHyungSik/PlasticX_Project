const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Admin } = require(path.resolve(modelsPath, "Admin"));

const callback = (req, res) => {
  const admin = new Admin(req.body);

  admin.save((err, adminInfo) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
    });
  });
};

module.exports = callback;
