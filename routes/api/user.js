const express = require("express");
const path = require("path");
const controllerPath = path.resolve(__dirname, "..", "..", "controller");
const middlewarePath = path.resolve(__dirname, "..", "..", "middleware");

const userRegist = require(path.resolve(controllerPath, "user", "UserRegist"));
const userLogin = require(path.resolve(controllerPath, "user", "UserLogin"));
const userAuth = require(path.resolve(controllerPath, "user", "UserAuth"));
const userLogout = require(path.resolve(controllerPath, "user", "UserLogout"));
const userDetail = require(path.resolve(controllerPath, "user", "UserDetail"));
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
router.post("/login", userLogin);

router.put("/", (req, res) => {
  res.status(400).json({
    message: "Bad Request",
  });
});

router.delete("/", (req, res) => {
  res.send("Received a DELETE request");
});

module.exports = router;
