// 순서 건들지 말것!
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");

const mongoose = require("mongoose");

const web = require(path.resolve(__dirname, "routes", "web"));
const api = require(path.resolve(__dirname, "routes", "api"));
const config = require(path.resolve(__dirname, "config", "key"));
const slack = require(path.resolve(__dirname, "config", "slack"));

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
  .catch((err) => console.log(err));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/web", web);
app.use("/api", api);
app.get("/", (req, res) => {
  res.redirect("/web");
});

app.use(slack);

module.exports = app;
