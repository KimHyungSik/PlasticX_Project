const express = require("express");
const path = require("path");
const router = express.Router();
const tumbler = require(path.resolve(__dirname, "web", "tumbler"));
//const owner = require(path.resolve(__dirname, "web", "owner"));
const slack = require(path.resolve(__dirname, "..", "config", "slack"));

// /web

router.get("/", (req, res) => {
  //res.status(200).render("home");
  //res.status(200).render("./client/plasticx-react/build/index.html");
});

router.use("/tumbler", tumbler);
//router.use("/owner", owner);

module.exports = router;
