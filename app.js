const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");

const path = require("path");
const api = require("./routes/api");
const config = require("./Config/key");

const app = express();

const mongoose = require("mongoose");
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

app.use("/api", api);

module.exports = app;
