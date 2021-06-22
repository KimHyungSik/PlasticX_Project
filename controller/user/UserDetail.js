const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { User } = require(path.resolve(modelsPath, "User"));

const callback = (req, res) => {
  User.findOne({ id: req.body.id }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        RESULT: 400,
        MESSAGE: "아이디에 해당하는 유저가 없습니다.",
      });
    } else {
      return res.json({
        RESULT: 200,
        MESSAGE: "유저 조회 성공",
        name: userInfo.name,
        email: userInfo.email,
        deposit: userInfo.deposit,
      });
    }
  });
};

module.exports = callback;
