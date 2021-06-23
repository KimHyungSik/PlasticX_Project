const express = require("express");
const path = require("path");
const controllerPath = path.resolve(__dirname, "..", "..", "controller");
const middlewarePath = path.resolve(__dirname, "..", "..", "middleware");

const adminRegist = require(path.resolve(
  controllerPath,
  "admin",
  "AdminRegist"
));
const adminLogin = require(path.resolve(controllerPath, "admin", "AdminLogin"));
const adminAuth = require(path.resolve(controllerPath, "admin", "AdminAuth"));
const adminLogout = require(path.resolve(
  controllerPath,
  "admin",
  "AdminLogout"
));

const { auth } = require(path.resolve(middlewarePath, "adminauth"));
const router = express.Router();

// /api/admin

router.get("/auth", auth, adminAuth);
router.get("/logout", auth, adminLogout);

router.post("/register", adminRegist);
router.post("/login", adminLogin);

module.exports = router;
