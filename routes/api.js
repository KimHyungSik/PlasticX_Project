const express = require("express");
const path = require("path");
const router = express.Router();
const user = require(path.resolve(__dirname, "api", "user"));
const admin = require(path.resolve(__dirname, "api", "admin"));
const tumbler = require(path.resolve(__dirname, "api", "tumbler"));
const slack = require(path.resolve(__dirname, "..", "config", "slack"));

// /api
router.use("/user", user);
router.use("/admin", admin);
router.use("/tumbler", tumbler);
router.use((err, req, res, next) => {
    var payload = {
        "blocks": [
          {
            "type": "header",
            "text": {
              "type": "plain_text",
              "text": "Request",
              "emoji": true
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*req.body:*\n"
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `\`\`\`${req.body}\`\`\``
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*req.params:*\n"
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `\`\`\`${req.params}\`\`\``
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*req.query:*\n"
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `\`\`\`${req.query}\`\`\``
            }
          }
        ]
      };
      sendSlackWebhook(payload);
    res.status(500).json({
        RESULT: 500,
        MESSAGE: "내부 오류 발생",
    });
    next(err);
});

module.exports = router;
