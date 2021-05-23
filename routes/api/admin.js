const express = require("express");
const adminRegist = require("../../Controller/Admin/AdminRegist");
const adminLogin = require("../../Controller/Admin/AdminLogin");
const router = express.Router();

router.get("/:id", (req, res) => {
  res.send(`Received a GET request, param ${req.params.id}`);
});

router.post("/register", adminRegist);
router.post("/login", adminLogin);

module.exports = router;
