// 로그인 되어있는 admin의 token을 가져온다
const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "models");

const { Admin } = require(path.resolve(modelsPath, "Admin"));

// 클라이언트 쿠키에서 토큰을 가져온다.
let auth = (req, res, next) => {
  let token = req.cookies.x_auth;

  // 토큰을 복호화 한 후 유저를 찾는다.
  Admin.findByToken(token, (err, admin) => {
    if (err) throw err;
    if (!admin) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.admin = admin;
    next();
  });
};

module.exports = { auth };
