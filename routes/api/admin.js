const express = require("express");
const adminRegist = require("../../Controller/admin/AdminRegist");
const adminLogin = require("../../Controller/admin/AdminLogin");
const adminLogout = require("../../Controller/admin/AdminLogout");
const { route } = require("./user");
const router = express.Router();

// /api/admin

router.post("/register", adminRegist);
router.post("/login", adminLogin);

router.get("/logout", adminLogout);

module.exports = router;
