const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));

const callback = (req, res) => {
  const tumbler = new Tumbler(req.body);

  tumbler.save((err, tumblerInfo) => {
    if (err) {
      return res.status(500).json({
        RESULT: 500,
        MESSAGE: "실패",
      });
    }
    return res.status(200).json({
      RESULT: 200,
      MESSAGE: "텀블러 생성 성공",
      tumbler_id: tumblerInfo._id,
    });
  });
};

module.exports = callback;
