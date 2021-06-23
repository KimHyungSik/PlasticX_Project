const express = require("express");
const path = require("path");
const { nextTick } = require("process");
const controllerPath = path.resolve(__dirname, "..", "..", "controller");
const { sendSlackWebhookRequest } = require(path.resolve(
  __dirname,
  "..",
  "..",
  "config",
  "slack"
));

const tumblerInsert = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerInsert"
));

const tumblerSelect = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerSelect"
));

const tumblerUpdate = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerUpdate"
));

const tumblerQrCreate = require(path.resolve(
  controllerPath,
  "tumbler",
  "TumblerQrCreate"
));

const router = express.Router();

// /api/tumbler

router.post(
  "/:_id",
  (req, res, next) => {
    sendSlackWebhookRequest(req);
    next();
  },
  tumblerQrCreate
);
router.post(
  "/",
  (req, res, next) => {
    sendSlackWebhookRequest(req);
    next();
  },
  tumblerInsert
);
router.get(
  "/:_id",
  (req, res, next) => {
    sendSlackWebhookRequest(req);
    next();
  },
  tumblerSelect
);
router.put(
  "/:_id",
  (req, res, next) => {
    sendSlackWebhookRequest(req);
    next();
  },
  tumblerUpdate
);
// router.delete("/:_id", tumblerDelete);

router.get(
  "/:id",
  (req, res, next) => {
    sendSlackWebhookRequest(req);
    next();
  },
  (req, res) => {
    return res.json({
      currentTime: Date(Date.now()),
      dueTime: Date(Date.now()),
    });
  }
);

module.exports = router;
