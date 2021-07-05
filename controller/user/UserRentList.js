const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));

const callback = (req, res) => {
  Tumbler.find(req.params, (err, tumblerInfo) => {
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
      return res.status(2000).json({
        RESULT: 400,
        MESSAGE: "없음",
      });
    }
    return res.json({
      RESULT: 200,
      MESSAGE: "검색 성공",
      list: tumblerInfo,
    });
  });
};

module.exports = callback;
