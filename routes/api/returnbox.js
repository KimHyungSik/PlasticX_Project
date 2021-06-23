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

const router = express.Router();

router.post("/", returnBoxInsert);

// creating a module for usage in other files
module.exports = router;