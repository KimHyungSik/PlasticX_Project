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

const tumblerDelete = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerDelete"
));

const router = express.Router();

// /tumbler

// 텀블러 생성
router.get("/register", (req, res) => {
  res.status(200).render("tumbler/register");
});
router.post(
  "/register",
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
  tumblerInsert.web
);

// 텀블러 목록 조회
router.get("/inquire", tumblerSelect.web);

// 텀블러 보기
router.get("/view", (req, res) => {
  res.status(200).render("tumbler/view");
});

// 텀블러 삭제
router.delete(
  "/",
  (req, res, next) => {
    slack.sendSlackWebhookRequest(req);
    next();
  },
  tumblerDelete
);

module.exports = router;
