const express = require("express");
const path = require("path");
const router = express.Router();
const slack = require(path.resolve(__dirname, "..", "config", "slack"));

// /web
router.get("/", (req, res) => {
  res.render("home");
});

router.use(slack);

module.exports = router;
