const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "models");

const { User } = require(path.resolve(modelsPath, "User"));

// 클라이언트 쿠키에서 토큰을 가져온다.
let auth = (req, res, next) => {
  let token = req.cookies.x_auth;
  console.log(req.cookies);
  // 토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        RESULT: 400,
        MESSAGE: "해당하는 유저가 로그인되어 있지 않습니다.",
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
