const express = require("express");
const path = require("path");
const router = express.Router();
const slack = require(path.resolve(__dirname, "..", "config", "slack"));

// /web

router.get("/err", (req, res) => {
  res.render("test", {error: thisiserror});
});

router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
