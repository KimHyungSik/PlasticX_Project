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
    // folder name
    controllerPath,
    // folder name
    "returnbox",
    // file name
    "ReturnBoxSelect"
));

const returnBoxUpdate = require(path.resolve(
    // folder name
    controllerPath,
    // folder name
    "returnbox",
    // file name
    "ReturnBoxUpdate"
));

const returnBoxDelete = require(path.resolve(
    // folder name
    controllerPath,
    // folder name
    "returnbox",
    // file name
    "ReturnBoxDelete"
));

// move to controller
const router = express.Router();

// "/:_id"
router.post("/insert-returnbox", returnBoxInsert);
router.get("/find-returnbox/:_id", returnBoxSelect);
router.put("/update-returnbox/:_id", returnBoxUpdate);
router.delete("/delete-returnbox/:_id", returnBoxDelete);

// creating a module for usage in other files
module.exports = router;