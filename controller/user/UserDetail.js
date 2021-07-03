const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { User } = require(path.resolve(modelsPath, "User"));

const callback = (req, res) => {
  if (!Object.keys(req.params).length) {
    return res.status(200).json({
      RESULT: 401,
      MESSAGE: "요청 값 없음",
    });
  }
  User.findOne(req.params, (err, userInfo) => {
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
    } else if (!userInfo) {
      return res.json({
        RESULT: 400,
        MESSAGE: "아이디에 해당하는 유저가 없습니다.",
      });
    }
    return res.json({
      RESULT: 200,
      MESSAGE: "유저 조회 성공",
      name: userInfo.name,
      email: userInfo.email,
      deposit: userInfo.deposit,
    });
  });
};

module.exports = callback;
