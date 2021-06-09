const express = require("express");
const path = require("path");
const { sendSlackWebhookError } = require("../config/slack");
const router = express.Router();
const user = require(path.resolve(__dirname, "api", "user"));
const admin = require(path.resolve(__dirname, "api", "admin"));
const tumbler = require(path.resolve(__dirname, "api", "tumbler"));
const slack = require(path.resolve(__dirname, "..", "config", "slack"));

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
router.use("/tumbler", printReq, tumbler);
router.use((err, req, res, next) => {
  res.status(500).json({
    RESULT: 500,
    MESSAGE: "실패",
  });
});

module.exports = router;
