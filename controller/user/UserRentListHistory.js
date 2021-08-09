const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { History } = require(path.resolve(modelsPath, "History"));

function dateFormat(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;

  return (
    date.getFullYear() +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second
  );
}

const callback = (req, res) => {
  History.find(req.params)
    .populate("tumbler")
    .populate("owner")
    .populate({
      path: "tumbler",
      populate: "model",
    })
    .exec(async (err, historyList) => {
      if (err) {
        if (err.name === "CastError" && err.kind === "ObjectId") {
          return res.status(200).json({
            RESULT: 401,
            MESSAGE: "잘못된 id값 입력",
            path: err.path,
          });
        }
        return res.status(200).json({
          RESULT: 500,
          MESSAGE: "DB 에러 발생",
          error: err,
        });
      }

      return res.json({
        RESULT: 200,
        MESSAGE: "검색 성공",
        tumblers: historyList,
      });
    });
};

module.exports = callback;
