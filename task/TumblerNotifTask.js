// 대여한지 7일이 지나면 앱으로 USER 한테 알림 보내기

const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "models");
const fcmPath = path.resolve(__dirname, "..", "config");

const { Client } = require("node-rest-client");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));
const { User } = require(path.resolve(modelsPath, "User"));
const FCM = require(path.resolve(fcmPath, "fcm"));

const checkTumbler = async (tumblerID) => {
  //  자정마다 checkTumbler 함수 돌리기
  let today = new Date();
  let time = today.getHours();
  if (time == 0) {
    let tumbler = await Tumbler.findOne({ _id: tumblerID }).populate("model");
    // 2. 날짜 검사
    // 최대 대여할 수 있는 날짜 변수
    const miliseconds = 1000;
    const seconds = 60;
    const minutes = 60;
    const hours = 24;
    const days = 7;
    let maxLoanDays = miliseconds * seconds * minutes * hours * days;
    // 텀블러가 대여된 날짜 변수
    let loanedDate = tumbler.date;

    // 3. 날짜 연산
    // current date - loaned date >= 7 days
    // 4. 텀블러의 to_id (현재 사용중 사용자 아이디) 찾기
    let user = await User.findById(tumbler.to_id);

    // 5. 알림을 보내기
    if (tumbler.state == true && Date.now() - loanedDate >= maxLoanDays) {
      console.log(
        `[TASK]\n${user.name}님의 ${tumbler.model.name}의 대여 기간이 만료되었습니다.`
      );
      var client = new Client();

      let args = {
        data: {
          to: user.fcm_token,
          notification: {
            title: `[TASK]\n${user.name}님의 ${tumbler.model.name}의 대여 기간이 만료되었습니다. 반납해주세요.`,
          },
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: FCM.TOKEN,
        },
      };
      await client.post(FCM.BASE_URI + FCM.SEND_URI, args, (data, result) => {
        console.log(data);
        console.log("사용자한데 알림 전송 선공");
      });
    }
  }
};

const callback = async () => {
  console.log("Sending Notifications...");
  // 1. 데이터 불러오기

  // 텀블러 (날짜 확인 할 곳)
  let tumbler = await Tumbler.find();
  tumbler.forEach((item, index) => {
    setInterval(checkTumbler, 3600000, item._id);
    //checkTumbler(item._id);
  });
};

module.exports = callback;
