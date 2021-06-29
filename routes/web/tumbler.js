const express = require("express");
const path = require("path");
const controllerPath = path.resolve(__dirname, "..", "..", "controller");
const slack = require(path.resolve(__dirname, "..", "..", "config", "slack"));

const tumblerInsert = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerInsert"
));

const router = express.Router();

// /tumbler

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
  tumblerInsert.web
);

// 텀블러 조회
router.get("/", (req, res) => {
  res.status(200).render("tumbler/register");
});

// 텀블러 삭제
// router.delete("/:_id", tumblerDelete);

module.exports = router;
