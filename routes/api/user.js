const express = require("express");
const path = require("path");
const slack = require(path.resolve(__dirname, "..", "..", "config", "slack"));
const controllerPath = path.resolve(__dirname, "..", "..", "controller");
const middlewarePath = path.resolve(__dirname, "..", "..", "middleware");

const userRegist = require(path.resolve(controllerPath, "user", "UserRegist"));
const userLogin = require(path.resolve(controllerPath, "user", "UserLogin"));
const userAuth = require(path.resolve(controllerPath, "user", "UserAuth"));
const userLogout = require(path.resolve(controllerPath, "user", "UserLogout"));
const userDetail = require(path.resolve(controllerPath, "user", "UserDetail"));
const userInfoChange = require(path.resolve(
  controllerPath,
  "user",
  "UserInfoChange"
));
const userRentList = require(path.resolve(
  controllerPath,
  "user",
  "UserRentList"
));

const { auth } = require(path.resolve(middlewarePath, "userauth"));
const router = express.Router();

// /api/user

router.get("/auth", auth, userAuth);
router.get("/logout", auth, userLogout);
router.get("/info/:_id", userDetail);
router.get("/list/:to_id", userRentList);

router.post("/register", userRegist);
router.post(
  "/login",
  (req, res, next) => {
    slack.sendSlackWebhookRequest(req);
    next();
  },
  userLogin
);

router.put("/", (req, res) => {
  res.status(400).json({
    message: "Bad Request",
  });
});
router.put(
  "/info/change/:_id",
  (req, res, next) => {
    slack.sendSlackWebhookRequest(req);
    next();
  },
  userInfoChange
);

router.delete("/", (req, res) => {
  res.send("Received a DELETE request");
});

module.exports = router;
