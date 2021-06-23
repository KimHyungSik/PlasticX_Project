const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));
const { User } = require(path.resolve(modelsPath, "User"));

const DEPOSIT = 5000;

const callback = (req, res) => {
  let tumbler;
  let user;

  Tumbler.findOne(req.params, (err, tumblerInfo) => {
    if (err) {
      if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(401).json({
          RESULT: 401,
          MESSAGE: "잘못된 id값 입력",
          path: err.path,
        });
      }
      return res.status(500).json({
        RESULT: 500,
        MESSAGE: "DB 에러 발생",
        error: err,
      });
    } else if (!tumblerInfo) {
      return res.status(400).json({
        RESULT: 400,
        MESSAGE: "아이디에 해당하는 텀블러 없음",
      });
    } else {
      tumbler = tumblerInfo;
      return null;
    }
  });

  let userQuery = new Object();
  userQuery._id = req.body.to_id;

  User.findOne(req.body.to_id, (err, userInfo) => {
    if (err) {
      if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(401).json({
          RESULT: 401,
          MESSAGE: "잘못된 id값 입력",
          path: err.path,
        });
      }
      return res.status(500).json({
        RESULT: 500,
        MESSAGE: "DB 에러 발생",
        error: err,
      });
    }
    if (!userInfo) {
      return res.status(400).json({
        RESULT: 400,
        MESSAGE: "아이디에 해당하는 유저 없음",
      });
    } else {
      user = userInfo;
      return null;
    }
  });

  // 1. 텀블러 대여 중인가 (state = false)
  // 2. user 보증금 >= 5000 인가
  // 3. 위에 두개 만족하면 state = true
  // 4. user 보증금 - 5000

  if (tumbler.state === false && user.deposit >= DEPOSIT) {
    var tumblerOK, userOK;
    var tumblerUpdate;
    var userUpdate;
    var depositResult;
    tumblerUpdate.state = true;
    userUpdate.deposit = user.deposit - DEPOSIT;
    Tumbler.updateOne(tumbler, tumblerUpdate, (err, updateResult) => {
      if (err) {
        tumblerOK = false;
        return res.status(500).json({
          RESULT: 500,
          MESSAGE: "",
        });
      } else {
        tumblerOK = true;
        return null;
      }
    });
    User.updateOne(user, userUpdate, (err, updateResult) => {
      if (err) {
        userOK = false;
        return res.status(500).json({
          RESULT: 500,
          MESSAGE: "",
        });
      } else {
        depositResult = updateResult.DEPOSIT;
        userOk = true;
        return null;
      }
    });
    if (tumblerOk && userOK) {
      return res.status(200).json({
        RESULT: 200,
        MESSAGE: "성공",
        DEPOSIT: depositResult,
      });
    }
  } else if (tumbler.state == false) {
    return res.status(300).json({
      RESULT: 300,
      MESSAGE: "보증금 부족",
      DEPOSIT: `현재 보증금 : ${user.deposit}`,
    });
  } else if (user.deposit >= DEPOSIT) {
    return res.status(301).json({
      RESULT: 301,
      MESSAGE: "텀블러 사용중",
    });
  }
};
// from_id = to_id
// to_id = user_id
// date 추가

module.exports = callback;
