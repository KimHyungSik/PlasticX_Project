const express = require("express");
const userRegist = require("../../Controller/user/UserRegist");
const userLogin = require("../../Controller/user/UserLogin");
const userAuth = require("../../Controller/user/UserAuth");
const userLogout = require("../../Controller/user/UserLogout");
const { auth } = require("../../middleware/Auth");
const router = express.Router();

// /api/user

router.get("/auth", auth, userAuth);
router.get("/logout", auth, userLogout);

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
