const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { ReturnBox } = require(path.resolve(modelsPath, "ReturnBox"));

const callback = (req, res) => {
  if (!Object.keys(req.params).length)
    return res.status(401).json({
      RESULT: 401,
      MESSAGE: "요청 값 없음",
    });

  ReturnBox.findOne(req.params, (err, returnBoxInfo) => {
    if (err) {
      if (err.name == "CastError" && err.kind == "ObjectId") {
        return res.status(200).json({
          RESULT: 401,
          MESSAGE: "질못된 id값 입력",
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
        MESSAGE: "텀블러 없음",
      });
    }
    return res.status(200).json({
      RESULT: 200,
      MESSAGE: "성공",
      RETURN: returnBoxInfo,
    });
  });
};

module.exports = callback;
