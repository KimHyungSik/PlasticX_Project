const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));

const callback = (req, res) => {
  Tumbler.findOne((err, tumblerInfo) => {
    if (err) throw err;
    else if (!tumblerInfo) {
      return res.status(400).json({
        RESULT: 400,
        MESSAGE: "텀블러 없음",
      });
    }
    return res.status(200).json({
      RESULT: 200,
      MESSAGE: "성공",
      RETURN: tumblerInfo,
    });
  });
};

module.exports = callback;
