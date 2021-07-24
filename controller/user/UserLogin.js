const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { User } = require(path.resolve(modelsPath, "User"));

const login = (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    { fcm_token: req.body.fcm_token },
    (err, userInfo) => {
      if (err) {
        return res.json({
          RESULT: 500,
          MESSAGE: "내부 오류 발생",
        });
      }
      if (!userInfo) {
        return res.status(200).json({
          RESULT: 400,
          MESSAGE: "이메일에 해당하는 유저가 없습니다.",
        });
      }
      userInfo.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.status(200).json({
            RESULT: 401,
            MESSAGE: "비밀번호가 틀렸습니다.",
          });
        }

        // 비밀번호가 맞다면 토큰 생성
        userInfo.generateToken((err, user) => {
          if (err) return res.status(200).send(err);
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ RESULT: 200, MESSAGE: "로그인 성공", user_id: user._id });
        });
      });
    }
  );
};

const kakao_login = (req, res) => {
  let kakao_user = new User(req.body);

  User.findByIdAndUpdate(kakao_user._id, kakao_user, (err, userInfo) => {
    if (err) {
      return res.json({
        RESULT: 500,
        MESSAGE: "내부 오류 발생",
      });
    }
    if (!userInfo) {
      kakao_user.name = "kaka_user";
      kakao_user.save((err, userInfo) => {
        console.log(userInfo);
        if (err) {
          return res.json({
            RESULT: 500,
            MESSAGE: "내부 오류 발생",
          });
        }
        kakao_user.generateToken((err, user) => {
          if (err) return res.status(200).send(err);
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ RESULT: 200, MESSAGE: "로그인 성공", user_id: user._id });
        });
      });
    }
    // userInfo.comparePassword(req.body.password, (err, isMatch) => {
    //   if (!isMatch) {
    //     return res.status(200).json({
    //       RESULT: 401,
    //       MESSAGE: "비밀번호가 틀렸습니다.",
    //     });
    //   }

    // 비밀번호가 맞다면 토큰 생성
    else {
      userInfo.generateToken((err, user) => {
        if (err) return res.status(200).send(err);
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ RESULT: 200, MESSAGE: "로그인 성공", user_id: user._id });
      });
    }
    //});
  });
};

const callback = (req, res) => {
  if (req.body._id) {
    kakao_login(req, res);
  } else {
    login(req, res);
  }
};

module.exports = callback;
