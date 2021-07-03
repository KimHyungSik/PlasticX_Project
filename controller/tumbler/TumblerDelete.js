const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));

const webCallback = async (req, res) => {
  let result = await register(req.body);
  res.render("tumbler/view", result);
};

const apiCallback = async (req, res) => {
  let result = await register(req.body);
  res.status(result.RESULT).json(result);
};

// const deleting = async (data) => {

// }

const callback = (req, res) => {
  if (!Object.keys(req.params).length) {
    return res.status(200).json({
      RESULT: 401,
      MESSAGE: "요청 값 없음",
    });
  }
  Tumbler.findOneAndDelete(req.params, (err, tumblerInfo) => {
    if (err) {
      if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(200).json({
          RESULT: 401,
          MESSAGE: "잘못된 id값 입력",
          path: err.path,
        });
      }
      return res.status(200).json({
        RESULT: 500,
        MESSAGE: "DB 에러 발생",
        error: err,
      });
    } else if (!tumblerInfo) {
      return res.status(200).json({
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
