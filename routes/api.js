const express = require("express");
const path = require("path");
const { sendSlackWebhookError } = require("../config/slack");
const router = express.Router();
const user = require(path.resolve(__dirname, "api", "user"));
const admin = require(path.resolve(__dirname, "api", "admin"));
const tumbler = require(path.resolve(__dirname, "api", "tumbler"));
const returnBox = require(path.resolve(__dirname, "api", "returnbox"));
const slack = require(path.resolve(__dirname, "..", "config", "slack"));

// print slack
const printReq = (req, res, next) => {
  var payload = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Request",
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*req.body:*\n",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\`\`\`${JSON.stringify(req.body, null, "\t")}\`\`\``,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*req.params:*\n",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\`\`\`${JSON.stringify(req.params, null, "\t")}\`\`\``,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*req.query:*\n",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\`\`\`${JSON.stringify(req.query, null, "\t")}\`\`\``,
        },
      },
    ],
  };
  slack.sendSlackWebhook(payload);
  next();
};

// /api
router.use("/user", printReq, user);
router.use("/admin", printReq, admin);
router.use(
  "/tumbler",
  printReq,
  (req, res, next) => {
    var date = new Date();
    date.setHours(date.getHours() + 9);
    req.body.date = date.toISOString();
    next();
  },
  tumbler
);
router.use((err, req, res, next) => {
  res.status(500).json({
    RESULT: 500,
    MESSAGE: "실패",
  });
  next(err);
});
router.use("/returnbox", printReq, returnBox);

module.exports = router;
