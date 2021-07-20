const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const fcmPath = path.resolve(__dirname, "..", "..", "config");

const { Client } = require("node-rest-client");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));
const { User } = require(path.resolve(modelsPath, "User"));
const FCM = require(path.resolve(fcmPath, "fcm"));

const DEPOSIT = 5000;

const callback = async (req, res) => {
  let user;
  let tumbler;

  // finding tumbler
  try {
    tumbler = await Tumbler.findOne(req.params);
  } catch (err) {
    console.log(err);
    if (err.name === "CastError" && err.kind === "ObjectId") {
      return res.status(200).json({
        RESULT: 401,
        MESSAGE: "잘못된 텀블러 id값 입력",
        path: err.path,
      });
    }
    return res.status(200).json({
      RESULT: 500,
      MESSAGE: "DB 에러 발생 (Tumbler Collection)",
      error: err,
    });
  }
  if (!tumbler) {
    return res.status(200).json({
      RESULT: 400,
      MESSAGE: "아이디에 해당하는 텀블러 없음",
    });
  }

  // set userQuery._id as to_id [user_id]
  // finding user
  let userQuery = new Object();
  //userQuery._id = req.body.to_id;
  userQuery._id = tumbler.to_id;

  try {
    user = await User.findOne(userQuery);
  } catch (err) {
    console.log(JSON.stringify(err));
    if (err) {
      if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(200).json({
          RESULT: 411,
          MESSAGE: "잘못된 유저 id값 입력",
          path: err.path,
        });
      }
      return res.status(200).json({
        RESULT: 500,
        MESSAGE: "DB 에러 발생 (User Collection)",
        error: err,
      });
    }
  }
  if (!user) {
    return res.status(200).json({
      RESULT: 410,
      MESSAGE: "아이디에 해당하는 유저 없음",
    });
  }
  // 1. 텀블러 대여 중인가 (state = false)
  // 2. user 보증금 >= DEPOSIT 인가
  // 3. 위에 두개 만족하면 state = true
  // 4. user 보증금 - DEPOSIT
  // from_id = to_id
  // to_id = user_id
  // date 추가
  let tumblerUpdate = new Tumbler(tumbler);
  let userUpdate = new User(user);

  if (tumbler.state == true) {
    userUpdate.deposit += DEPOSIT;
    tumblerUpdate.state = false;

    // 날짜 업데이트
    var date = new Date();
    date.setHours(date.getHours() + 9);
    tumblerUpdate.date = date.toISOString();

    // from, to 업데이트
    tumblerUpdate.from_id = tumbler.to_id;
    tumblerUpdate.to_id = req.body.to_id;

    const session = await User.startSession();
    try {
      await session.withTransaction(async () => {
        await User.findByIdAndUpdate(userUpdate._id, userUpdate);
        await Tumbler.findByIdAndUpdate(tumblerUpdate._id, tumblerUpdate);
      });
    } catch (err) {
      console.log(err);
      if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(200).json({
          RESULT: 401,
          MESSAGE: `잘못된 id값 입력, (${
            err.message.split('"').reverse()[1]
          } Collection)`,
          path: err.path,
        });
      }
      return res.status(200).json({
        RESULT: 500,
        MESSAGE: `DB 에러 발생 , (${
          err.message.split('"').reverse()[1]
        } Collection)`,
        error: err,
      });
    } finally {
      await session.endSession();
    }
  }

  if (
    userUpdate.deposit > user.deposit &&
    tumbler.state != tumblerUpdate.state
  ) {
    // 알림
    var client = new Client();

    console.log(userUpdate);
    let args = {
      data: {
        to: userUpdate.fcm_token,
        notification: { title: "반납되었습니다." },
      },
      headers: { "Content-Type": "application/json", Authorization: FCM.TOKEN },
    };
    await client.post(FCM.BASE_URI + FCM.SEND_URI, args, (data, result) => {
      console.log(data);
      return res.status(200).json({
        RESULT: 200,
        MESSAGE: "텀블러 반납 성공",
        DEPOSIT: userUpdate.deposit,
      });
    });
  } else {
    return res.status(200).json({
      RESULT: 300,
      MESSAGE: "내부 에러 발생",
      DEPOSIT: `현재 보증금 : ${userUpdate.deposit}`,
    });
  }
};

module.exports = callback;
