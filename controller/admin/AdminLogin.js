const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Admin } = require(path.resolve(modelsPath, "Admin"));

const callback = (req, res) => {
  Admin.findOne({ email: req.body.email }, (err, adminInfo) => {
    if (!adminInfo) {
      return res.json({
        loginSuccess: false,
        message: "이메일에 해당하는 관리자가 없습니다.",
      });
    }
    adminInfo.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }

      // 비밀번호가 맞다면 토큰 생성
      adminInfo.generateToken((err, admin) => {
        if (err) throw err;
        res
          .cookie("x_auth", admin.token)
          .status(200)
          .json({ loginSuccess: true, adminId: admin._id });
      });
    });
  });
};

module.exports = callback;
