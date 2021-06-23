// this program tells express 
// what to do in case of an insert/post

// configuring path settings
const express = require("express");
const path = require("path");
const controllerPath = path.resolve(__dirname, "..", "..", "controller");


// path variable
const returnBoxInsert = require(path.resolve(
    // folder name
    controllerPath,
    // folder name
    "returnbox",
    // file name
    "ReturnBoxInsert"
));

const returnBoxSelect = require(path.resolve(
    controllerPath,
    "returnbox",
    "ReturnBoxSelect"
))

const router = express.Router();

router.post("/insert", returnBoxInsert);
router.get("/select/:_id", returnBoxSelect);

// creating a module for usage in other files
module.exports = router;