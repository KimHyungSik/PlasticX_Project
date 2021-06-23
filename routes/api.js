const express = require("express");
const path = require("path");
const { sendSlackWebhookError } = require("../config/slack");
const router = express.Router();
const user = require(path.resolve(__dirname, "api", "user"));
const admin = require(path.resolve(__dirname, "api", "admin"));
const tumbler = require(path.resolve(__dirname, "api", "tumbler"));
const returnBox = require(path.resolve(__dirname, "api", "returnbox"));
const slack = require(path.resolve(__dirname, "..", "config", "slack"));

// /api
router.use("/user", user);
router.use("/admin", admin);
router.use("/tumbler", tumbler);
router.use("/returnbox", returnBox);
router.use((err, req, res, next) => {
  res.status(500).json({
    RESULT: 500,
    MESSAGE: "실패",
  });
  next(err);
});

module.exports = router;
