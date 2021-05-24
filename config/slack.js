const { IncomingWebhook } = require("@slack/webhook");
const env = require("./env");

const url = env.webhook;

const webhook = new IncomingWebhook(url);

const callback = async (err, req, res, next) => {
  await webhook.send({
    text: err.stack,
  });
  next(err);
};

module.exports = callback;
