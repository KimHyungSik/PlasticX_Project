const express = require("express");
const path = require("path");
const controllerPath = path.resolve(__dirname, "..", "..", "controller");
const slack = require(path.resolve(__dirname, "..", "..", "config", "slack"));

const ownerInsert = require(path.resolve(
  controllerPath,
  "owner",
  "OwnerInsert"
));

// const ownerSelect = require(path.resolve(
//   controllerPath,
//   "owner",
//   "TumblerModelSelect"
// ));

// const ownerUpdate = require(path.resolve(
//   controllerPath,
//   "owner",
//   "TumblerModelUpdate"
// ));

// const ownerDelete = require(path.resolve(
//   controllerPath,
//   "owner",
//   "TumblerModelDelete"
// ));

const router = express.Router();

// /api/owner

// 텀블러 모델 생성
router.post(
  "/",
  (req, res, next) => {
    slack.sendSlackWebhookRequest(req);
    next();
  },
  ownerInsert.api
);

module.exports = router;
