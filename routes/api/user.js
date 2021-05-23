const express = require("express");
const userRegist = require("../../Controller/User/UserRegist");
const userLogin = require("../../Controller/User/UserLogin");
const router = express.Router();

router.get("/:id", (req, res) => {
  res.send(`Received a GET request, param ${req.params.id}`);
});

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
