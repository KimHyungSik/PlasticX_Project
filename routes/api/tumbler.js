const express = require("express");
const path = require("path");
const controllerPath = path.resolve(__dirname, "..", "..", "controller");

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

const tumblerUpdate = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerUpdate"
));

const router = express.Router();

// /api/tumbler

router.get("/tumblerSelect", tumblerSelect);

router.post("/register", tumblerInsert);

router.put("/update", tumblerUpdate);

module.exports = router;
