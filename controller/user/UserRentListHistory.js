const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { History } = require(path.resolve(modelsPath, "History"));

const callback = (req, res) => {
  let tumblers = [];
  let borrowed = [];
  let returned = [];

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

      historyList.forEach((e) => {
        let temp = new Object();

        temp.id = e.tumbler._id;
        temp.model = e.tumbler.model.name;

        if (e.returnBox) {
          let returnedDate = new Date(e.date);
          temp.returned_date = returnedDate.toISOString();
          temp.returned_date =
            temp.returned_date.slice(0, 10) +
            " " +
            temp.returned_date.slice(11, 16);

          temp.shop = e.owner.name;
          temp.returnbox = e.returnBox;

          returned.push(temp);
        } else {
          let borrowedDate = new Date(e.date);

          // temp.shop = e.owner.name;
          temp.borrowed_date = borrowedDate.toISOString();
          temp.borrowed_date =
            temp.borrowed_date.slice(0, 10) +
            " " +
            temp.borrowed_date.slice(11, 16);

          borrowed.push(temp);
        }
      });

      return res.json({
        RESULT: 200,
        MESSAGE: "검색 성공",
        tumblers_returned: returned,
        tumblers_borrowed: borrowed,
      });
    });
};

module.exports = callback;
