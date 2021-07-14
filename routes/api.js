const express = require("express");
const path = require("path");
const router = express.Router();
const user = require(path.resolve(__dirname, "api", "user"));
const admin = require(path.resolve(__dirname, "api", "admin"));
const owner = require(path.resolve(__dirname, "api", "owner"));
const tumbler = require(path.resolve(__dirname, "api", "tumbler"));
const tbmodel = require(path.resolve(__dirname, "api", "tbmodel"));
const returnBox = require(path.resolve(__dirname, "api", "returnbox"));

// /api
router.use("/user", user);
router.use("/admin", admin);
router.use("/owner", owner);
router.use("/tumbler", tumbler);
router.use("/tbmodel", tbmodel);
router.use("/returnbox", returnBox);
router.use((err, req, res, next) => {
  res.status(500).json({
    RESULT: 500,
    MESSAGE: "실패",
  });
  next(err);
});

module.exports = router;
