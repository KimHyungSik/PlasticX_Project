const { userInfo } = require("os");
const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));
const { User } = require(path.resolve(modelsPath, "User"));

const DEPOSIT = 5000;

const callback = async (req, res) => {
  let user;
  let tumbler;
  let errorStack = new Array();

  try {
    tumbler = await Tumbler.findOne(req.params, (err, tumblerInfo) => {
      if (err) {
        if (err.name === "CastError" && err.kind === "ObjectId") {
          return errorStack.push({
            RESULT: 401,
            MESSAGE: "잘못된 id값 입력 on Tumbler.findOne",
            path: err.path,
          });
        }
        return errorStack.push({
          RESULT: 500,
          MESSAGE: "DB 에러 발생 on Tumbler.findOne",
          error: err,
        });
      } else if (!tumblerInfo) {
        return errorStack.push({
          RESULT: 400,
          MESSAGE: "아이디에 해당하는 텀블러 없음",
        });
      } else return;
    });
  } catch (error) {
    throw error;
  }

  let userQuery = new Object();
  userQuery._id = req.body.to_id;

  try {
    user = await User.findOne(userQuery, (err, userInfo) => {
      if (err) {
        if (err.name === "CastError" && err.kind === "ObjectId") {
          return errorStack.push({
            RESULT: 401,
            MESSAGE: "잘못된 id값 입력 on User.findOne",
            path: err.path,
          });
        }
        return errorStack.push({
          RESULT: 500,
          MESSAGE: "DB 에러 발생 on User.findOne",
          error: err,
        });
      }
      if (!userInfo) {
        return errorStack.push({
          RESULT: 400,
          MESSAGE: "아이디에 해당하는 유저 없음",
        });
      } else return;
    });
  } catch (error) {
    throw error;
  }

  // 1. 텀블러 대여 중인가 (state = false)
  // 2. user 보증금 >= 5000 인가
  // 3. 위에 두개 만족하면 state = true
  // 4. user 보증금 - 5000
  let tumblerUpdate = new Tumbler(tumbler);
  let userUpdate = new User(user);
  if (tumbler.state == false && user.deposit >= DEPOSIT) {
    userUpdate.deposit -= 5000;
    tumblerUpdate.state = true;

    var date = new Date();
    date.setHours(date.getHours() + 9);
    tumblerUpdate.date = date.toISOString();

    tumblerUpdate.from_id = tumbler.to_id;
    tumblerUpdate.to_id = req.body.to_id;
    try {
      await userUpdate.save((err, saveResult) => {
        if (err) {
          if (err.name === "CastError" && err.kind === "ObjectId") {
            return errorStack.push({
              RESULT: 401,
              MESSAGE: "잘못된 id값 입력 on User.findOne",
              path: err.path,
            });
          }
          return errorStack.push({
            RESULT: 500,
            MESSAGE: "DB 에러 발생 on User.findOne",
            error: err,
          });
        } else {
          tumblerUpdate.save((err, saveResult) => {
            if (err) {
              if (err.name === "CastError" && err.kind === "ObjectId") {
                return errorStack.push({
                  RESULT: 401,
                  MESSAGE: "잘못된 id값 입력 on Tumbler.findOne",
                  path: err.path,
                });
              }
              return errorStack.push({
                RESULT: 500,
                MESSAGE: "DB 에러 발생 on Tumbler.findOne",
                error: err,
              });
            } else return;
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }
  if (
    user.deposit - userUpdate.deposit >= 5000 &&
    tumbler.state != tumblerUpdate.state
  ) {
    return res.status(200).json({
      RESULT: 200,
      MESSAGE: "성공",
      DEPOSIT: userUpdate.deposit,
    });
  } else if (tumbler.state == true) {
    return res.status(301).json({
      RESULT: 301,
      MESSAGE: "텀블러 사용중",
    });
  } else if (user.deposit < 5000) {
    return res.status(300).json({
      RESULT: 300,
      MESSAGE: "보증금 부족",
      DEPOSIT: `현재 보증금 : ${user.deposit}`,
    });
  } else return res.status(500).json(errorStack);
};
// from_id = to_id
// to_id = user_id
// date 추가

module.exports = callback;
