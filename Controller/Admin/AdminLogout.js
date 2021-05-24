const { Admin } = require("../../models/Admin");

const callback = (req, res) => {
  Admin.findOneAndUpdate(
    { _id: req.body._id },
    { token: "" },
    (err, adminInfo) => {
      if (err) return res.json({ success: false, err });
      return adminInfo.status(200).send({
        success: true,
      });
    }
  );
};

module.exports = callback;
