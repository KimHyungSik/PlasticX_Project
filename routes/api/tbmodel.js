const express = require("express");
const path = require("path");
const controllerPath = path.resolve(__dirname, "..", "..", "controller");
const slack = require(path.resolve(__dirname, "..", "..", "config", "slack"));

const tumblerModelInsert = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerModelInsert"
));

const tumblerModelSelect = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerModelSelect"
));

const tumblerModelUpdate = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerModelUpdate"
));

const tumblerModelDelete = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerModelDelete"
));

const router = express.Router();

// /api/tbmodel

// 텀블러 모델 생성
router.post(
  "/",
  (req, res, next) => {
    slack.sendSlackWebhookRequest(req);
    next();
  },
  tumblerModelInsert.api
);

// 텀블러 모델 조회
// router.get(
//   "/:_id",
//   (req, res, next) => {
//     slack.sendSlackWebhookRequest(req);
//     next();
//   },
//   tumblerModelSelect.api
// );

// // 텀블러 모델 업데이트 (사진 업데이트 등)
// router.put(
//   "/:_id",
//   (req, res, next) => {
//     slack.sendSlackWebhookRequest(req);
//     next();
//   },
//   tumblerModelUpdate.api
// );

// router.delete(
//   "/:_id",
//   (req, res, next) => {
//     slack.sendSlackWebhookRequest(req);
//     next();
//   },
//   tumblerModelDelete.api
// );

module.exports = router;
