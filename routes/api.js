const express = require("express");
const path = require("path");
const router = express.Router();
const user = require(path.resolve(__dirname, "api", "user"));
const admin = require(path.resolve(__dirname, "api", "admin"));
const slack = require(path.resolve(__dirname, "..", "config", "slack"));

// /api
router.use("/user", user);
router.use("/admin", admin);

module.exports = router;
