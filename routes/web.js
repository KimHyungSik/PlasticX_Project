const express = require("express");
const router = express.Router();
const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "models");
const config = require(path.resolve(__dirname, "..", "config", "key"));

//const tumbler = require(path.resolve(__dirname, "web", "tumbler"));
//const mongoose = require("mongoose");
//const owner = require(path.resolve(__dirname, "web", "owner"));

const { User } = require(path.resolve(modelsPath, "User"));
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));
const { TumblerModel } = require(path.resolve(modelsPath, "TumblerModel"));
const { ReturnBox } = require(path.resolve(modelsPath, "ReturnBox"));
const { Owner } = require(path.resolve(modelsPath, "Owner"));

// /web

// index 페이지
router.get("/", (req, res) => {
  var members = [
    { name: "김형식", role: "app dev" },
    { name: "주정하", role: "web dev" },
    { name: "박경용", role: "hw dev" },
    { name: "조유빈", role: "web des" },
  ];
  var tagline = "관리자 페이지 입니다";

  res.status(200).render("pages/index", {
    members: members,
    tagline: tagline,
  });
});

// USER
router.get("/user", (req, res) => {
  let userList = User.find({}, function (err, userData) {
    userList = userData;
    res.render("pages/user", { users: userList });
  });
});
router.post("/user", (req, res) => {
  User.find(req.body, function (err, userData) {
    res.render("pages/user", { users: userData });
  });
});

//TUMBLER
router.get("/tumbler", (req, res) => {
  let tumblerList = Tumbler.find({}, function (err, tumblerData) {
    tumblerList = tumblerData;
    res.render("pages/tumbler", { tumblers: tumblerList });
  });
});
router.post("/tumbler", (req, res) => {
  Tumbler.find(req.body, function (err, tumblerData) {
    res.render("pages/tumbler", { tumblers: tumblerList });
  });
});

// MODEL
router.get("/model", (req, res) => {
  let modelList = TumblerModel.find({}, function (err, tumblerModelData) {
    modelList = tumblerModelData;
    res.render("pages/model", { models: modelList });
  });
});
router.post("/model", (req, res) => {
  TumblerModel.find(req.body, function (err, modelData) {
    res.render("pages/model", { models: tumblerList });
  });
});

// RETURNBOX
router.get("/returnbox", (req, res) => {
  let returnBoxList = ReturnBox.find({}, function (err, returnBoxData) {
    returnBoxList = returnBoxData;
    res.render("pages/returnbox", { returnboxes: returnBoxList });
  });
});
router.post("/returnbox", (req, res) => {
  ReturnBox.find(req.body, function (err, returnBoxData) {
    res.render("pages/returnbox", { returnboxes: returnBoxList });
  });
});

// OWNER
router.get("/owner", (req, res) => {
  let ownerList = Owner.find({}, function (err, ownerData) {
    ownerList = ownerData;
    res.render("pages/owner", { owners: ownerList });
  });
});
router.post("/owner", (req, res) => {
  Owner.find(req.body, function (err, ownerData) {
    res.render("pages/owner", { owners: ownerData });
  });
});
// router.use("/tumbler", tumbler);
// //router.use("/owner", owner);

module.exports = router;
