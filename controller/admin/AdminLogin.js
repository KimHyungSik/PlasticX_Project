const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Admin } = require(path.resolve(modelsPath, "Admin"));

const callback = (req, res) => {
  Admin.findOne({ email: req.body.email }, (err, adminInfo) => {
    if (!adminInfo) {
      return res.json({
        RESULT: 400,
        MESSAGE: "이메일에 해당하는 관리자가 없습니다.",
      });
    }
    adminInfo.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          RESULT: 401,
          MESSAGE: "비밀번호가 틀렸습니다.",
        });
      }

      // 비밀번호가 맞다면 토큰 생성
      adminInfo.generateToken((err, admin) => {
        if (err) return res.status(200).send(err);
        res
          .cookie("x_auth", admin.token)
          .status(200)
          .json({ RESULT: 200, MESSAGE: "로그인 성공", admin_id: admin._id });
      });
    });
  });
};

module.exports = callback;
