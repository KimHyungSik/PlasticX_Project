const express = require("express");
const path = require("path");
const controllerPath = path.resolve(__dirname, "..", "..", "controller");
const adminRegist = require(path.resolve(
  controllerPath,
  "admin",
  "AdminRegist"
));
const adminLogin = require(path.resolve(controllerPath, "admin", "AdminLogin"));
const adminLogout = require(path.resolve(
  controllerPath,
  "admin",
  "AdminLogout"
));
const router = express.Router();

// /api/admin

router.post("/register", adminRegist);
router.post("/login", adminLogin);

router.get("/logout", adminLogout);

module.exports = router;
