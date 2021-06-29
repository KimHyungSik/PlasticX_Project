const express = require("express");
const path = require("path");
const controllerPath = path.resolve(__dirname, "..", "..", "controller");
const slack = require(path.resolve(__dirname, "..", "..", "config", "slack"));

const tumblerInsert = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerInsert"
));

const tumblerSelect = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerSelect"
));

const tumblerUpdate = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerUpdate"
));

const tumblerDepositCheck = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerDepositCheck"
));

const router = express.Router();

// /api/tumbler

// 텀블러 생성
router.post(
  "/",
  (req, res, next) => {
    var date = new Date();
    date.setHours(date.getHours() + 9);
    req.body.date = date.toISOString();
    next();
  },
  (req, res, next) => {
    slack.sendSlackWebhookRequest(req);
    next();
  },
  tumblerInsert.api
);

// 텀블러 조회
router.get(
  "/:_id",
  (req, res, next) => {
    slack.sendSlackWebhookRequest(req);
    next();
  },
  tumblerSelect,
  (req, res) => {
    return res.json({
      currentTime: Date(Date.now()),
      dueTime: Date(Date.now()),
    });
  }
);

// 텀블러 사용유무, 보증금 확인
router.post(
  "/:_id",
  (req, res, next) => {
    slack.sendSlackWebhookRequest(req);
    next();
  },
  tumblerDepositCheck
);

// 텀블러 위치에 따른 to_id, from_id 변경
router.put(
  "/:_id",
  (req, res, next) => {
    var date = new Date();
    date.setHours(date.getHours() + 9);
    req.body.date = date.toISOString();
    next();
  },
  (req, res, next) => {
    slack.sendSlackWebhookRequest(req);
    next();
  },
  tumblerUpdate
);

// 텀블러 삭제
// router.delete("/:_id", tumblerDelete);

module.exports = router;
