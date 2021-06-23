const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Admin } = require(path.resolve(modelsPath, "Admin"));

const callback = (req, res) => {
  const admin = new Admin(req.body);

  admin.save((err, adminInfo) => {
    if (err) {
      if (err.code === 11000 && Object.keys(err.keyPattern).includes("email")) {
        return res.status(400).json({
          RESULT: 400,
          MESSAGE: "관지라 계정이 이미 존재합니다.",
        });
      }
      return res.status(500).json({
        RESULT: 500,
        MESSAGE: "관리자 등록 실패",
        error: err,
      });
    }
    console.log(adminInfo);
    return res.status(200).json({
      RESULT: 200,
      MESSAGE: "관리자 가입 성공",
      admin_id: admin._id,
    });
  });
};

module.exports = callback;
