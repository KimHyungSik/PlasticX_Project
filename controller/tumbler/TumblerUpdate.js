const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));

const callback = (req, res) => {
  const filter = {
    _id: req.body._id,
  };
  Tumbler.findOne(filter, (err, tumblerInfo) => {
    if (err) throw err;
    else if (!tumblerInfo) {
      return res.status(400).json({
        RESULT: 400,
        MESSAGE: "없음",
      });
    }
    const update = {
      from_id: tumblerInfo.to_id,
      to_id: req.body.to_id,
    };
    return Tumbler.updateOne(filter, update, (err, updateResult) => {
      if (err) {
        return res.status(500).json({
          RESULT: 500,
          MESSAGE: "실패",
        });
      }
      return res.status(200).json({
        RESULT: 200,
        MESSAGE: "성공",
        update: updateResult,
      });
    });
  });
};

module.exports = callback;
