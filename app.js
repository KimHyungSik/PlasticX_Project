// 순서 건들지 말것!
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const hbs = require("express-handlebars");

const mongoose = require("mongoose");

const web = require(path.resolve(__dirname, "routes", "web"));
const api = require(path.resolve(__dirname, "routes", "api"));
const config = require(path.resolve(__dirname, "config", "key"));
const slack = require(path.resolve(__dirname, "config", "slack"));
const err_logger = require(path.resolve(__dirname, "config", "log"));
const err_response = require(path.resolve(__dirname, "config", "error"));

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

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.get("/err", (req, res) => {
  res.render("test", { error: 500 });
});
app.use("/web", web);
app.use("/api", api);
app.get("/", (req, res) => {
  res.redirect("/web");
});
app.get("/:id", (req, res) => {
  return res.json({
    currentTime: Date(Date.now()),
    dueTime: Date(Date.now()),
  });
});

app.use(err_logger);
app.use((err, req, res, next) => {
  slack.sendSlackWebhookError(err);
  next(err);
});
app.use(err_response);

module.exports = app;
