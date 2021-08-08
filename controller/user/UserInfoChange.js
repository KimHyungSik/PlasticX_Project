const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { User } = require(path.resolve(modelsPath, "User"));

const callback = (req, res) => {
  User.findOneAndUpdate(req.params, req.body, (err, userInfo) => {
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
    return res.status(200).json({
      RESULT: 200,
      MESSAGE: "사용자 이름, 이메일 변경 성공",
      updated_user_name: req.body.name,
      updated_user_email: req.body.email,
    });
  });
};

module.exports = callback;
