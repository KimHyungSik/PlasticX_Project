const express = require("express");
const router = express.Router();

// /web
router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
