const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { User } = require(path.resolve(modelsPath, "User"));

const callback = (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) {
      if (err.code === 11000 && Object.keys(err.keyPattern).includes("email")) {
        return res.status(200).json({
          RESULT: 400,
          MESSAGE: "계정이 이미 존재합니다.",
        });
      }
      return res.status(200).json({
        RESULT: 500,
        MESSAGE: "사용자 등록 실패",
        error: err,
      });
    }
    console.log(userInfo);
    return res.status(200).json({
      RESULT: 200,
      MESSAGE: "회원가입 성공",
      user_id: user._id,
    });
  });
};

module.exports = callback;
