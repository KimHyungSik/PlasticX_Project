// 리턴 박스가 다 차이면 모든 ADMIN한테 알림 보내기
const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "models");
const fcmPath = path.resolve(__dirname, "..", "config");

const { Client } = require("node-rest-client");
const { Admin } = require(path.resolve(modelsPath, "Admin"));
const { ReturnBox } = require(path.resolve(modelsPath, "ReturnBox"));
const FCM = require(path.resolve(fcmPath, "fcm"));

const sendNotif = async (adminID, location) => {
  let admin = await Admin.findById(adminID).populate("model");

  console.log(
    `[${admin.name} 관리자님]\n${location}에 있는 리턴 박스가 최대 용량에 도달했습니다.`
  );

  var client = new Client();

  let args = {
    data: {
      to: admin.fcm_token,
      notification: {
        title: `[${admin.name} 관리자님]\n${location}에 있는 리턴 박스가 최대 용량에 도달했습니다.`,
      },
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: FCM.TOKEN,
    },
  };
  await client.post(FCM.BASE_URI + FCM.SEND_URI, args, (data, result) => {
    console.log(data);
    console.log("관리자한데 알림 전송 선공");
  });
};

const isFull = async (returnBoxID) => {
  // tumblerCount가 6이면 알림 보내기
  // 2. 개수 검사
  // 최대 개수
  let max = 6;
  // 검사할 리턴 박스 저장
  let returnBox = await ReturnBox.findById(returnBoxID).populate("model");
  // 현재 검사중인 리턴 박스 텀블러 개수
  let count = returnBox.tumblerCount;
  // ADMIN 가져오기
  let admin = await Admin.find();
  let location = returnBox.location;

  // 3. 알림 보내기
  if (count == max) {
    // 모든 ADMIN에게
    admin.forEach((item) => {
      sendNotif(item._id, location);
    });
  }
};

const callback = async () => {
  console.log("Sending Notifications to [ADMINS]");

  // 1. 데이터 불러오기
  // 1시간 마다 검사 실시
  // 리턴 박스 모델 불러오기
  let returnBox = await ReturnBox.find();
  returnBox.forEach((item, index) => {
    setInterval(isFull, 3600000, item._id);
    //sendNotif(item._id);
  });
};

module.exports = callback;
