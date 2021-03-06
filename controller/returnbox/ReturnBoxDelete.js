const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { ReturnBox } = require(path.resolve(modelsPath, "ReturnBox"));

const callback = (req, res) => {
  ReturnBox.findOne(req.params, (err, returnBoxInfo) => {
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
    } else if (!returnBoxInfo) {
      return res.status(200).json({
        RESULT: 400,
        MESSAGE: "없음",
      });
    }

    return ReturnBox.deleteOne(req.params, req.body, (err, updateResult) => {
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
      }
      return res.status(200).json({
        RESULT: 200,
        MESSAGE: "리터박스 삭제 성공",
        UPDATE: updateResult,
      });
    });
  });
};

module.exports = callback;
