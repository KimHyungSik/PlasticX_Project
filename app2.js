// 순서 건들지 말것!
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const hbs = require("express-handlebars");

const mongoose = require("mongoose");
const callback = require("./task/ReturnBoxTask");

const web = require(path.resolve(__dirname, "routes", "web"));
const api = require(path.resolve(__dirname, "routes", "api"));
const config = require(path.resolve(__dirname, "config", "key"));
const slack = require(path.resolve(__dirname, "config", "slack"));
const err_logger = require(path.resolve(__dirname, "config", "log"));
const err_response = require(path.resolve(__dirname, "config", "error"));
const returnBoxTask = require(path.resolve(__dirname, "task", "ReturnBoxTask"));

const app = express();

mongoose
  .connect(config.mongoURI, {
    dbName: "PlasticX",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => {
    console.log(err);
    slack.sendSlackWebhookError(err);
  });

// 여기에 태스크 코드
returnBoxTask();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "client")));

app.use(err_logger);
app.use((err, req, res, next) => {
  slack.sendSlackWebhookError(err);
  next(err);
});
// app.use(err_response);

module.exports = app;
