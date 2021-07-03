const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));

const callback = (req, res) => {
  Tumbler.findOne(req.params, (err, tumblerInfo) => {
    if (err) {
      if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(200).json({
          RESULT: 401,
          MESSAGE: "잘못된 id값 입력",
          path: err.path,
        });
      }
      return res.status(500).json({
        RESULT: 500,
        MESSAGE: "DB 에러 발생",
        error: err,
      });
    } else if (!tumblerInfo) {
      return res.status(400).json({
        RESULT: 400,
        MESSAGE: "없음",
      });
    }
    req.body.from_id = tumblerInfo.to_id;
    return Tumbler.updateOne(req.params, req.body, (err, updateResult) => {
      if (err) {
        if (err.name === "CastError" && err.kind === "ObjectId") {
          return res.status(401).json({
            RESULT: 401,
            MESSAGE: "잘못된 id값 입력",
            path: err.path,
          });
        }
        return res.status(500).json({
          RESULT: 500,
          MESSAGE: "DB 에러 발생",
          error: err,
        });
      }
      return res.status(200).json({
        RESULT: 200,
        MESSAGE: "텀블러 수정 성공",
        update: updateResult,
      });
    });
  });
};

module.exports = callback;
