// 순서 건들지 말것!
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const hbs = require("express-handlebars");
const cors = require("cors");

const mongoose = require("mongoose");

const web = require(path.resolve(__dirname, "routes", "web"));
const api = require(path.resolve(__dirname, "routes", "api"));
const config = require(path.resolve(__dirname, "config", "key"));
const slack = require(path.resolve(__dirname, "config", "slack"));
const err_logger = require(path.resolve(__dirname, "config", "log"));
const err_response = require(path.resolve(__dirname, "config", "error"));
const { emailTransporter } = require(path.resolve(__dirname, "config", "mail"));
const returnBoxTask = require(path.resolve(__dirname, "task", "ReturnBoxTask"));
const tumblerNotifTask = require(path.resolve(
  __dirname,
  "task",
  "TumblerNotifTask"
));

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

emailTransporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

// 여기에 태스크 코드
returnBoxTask();
tumblerNotifTask();

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    helpers: {
      sect_in: (item, options) => {
        if (!this._sections) this._sections = {};
        this._sections[item] = options.fn(this);
        return null;
      },
      sect_out: (item, options) => {
        if (!this._sections) return null;
        return this._sections[item];
      },
      /*
      test: (item, options) => {
        let testString = "";
        for (let i = 0; i < item.a; i++) {
          testString += options.fn(item);
        }
        return testString;
      },
      */
    },
  })
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname, "client")));

app.get("/err", (req, res) => {
  res.render("test", { error: 500 });
});

// app.get("/api/hello", (req, res) => {
//   res.send("안녕하세유");
// });

app.use("/", web);

app.use(err_logger);
app.use((err, req, res, next) => {
  slack.sendSlackWebhookError(err);
  next(err);
});
// app.use(err_response);

module.exports = app;
