const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));
const { User } = require(path.resolve(modelsPath, "User"));

const callback = (req, res) => {
  let tumblers = [];

  Tumbler.find(req.params)
    .populate("model")
    .populate("from_id")
    .exec(async (err, tumblerInfo) => {
      let user;
      try {
        user = await User.findOne({ _id: req.params.to_id });
      } catch (error) {}
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
      } else if (!user) {
        return res.status(200).json({
          RESULT: 400,
          MESSAGE: "해당하는 유저 없음",
        });
      }
      tumblerInfo.forEach((e) => {
        let temp = new Object();
        let usabledDate = new Date(e.date);

        temp.id = e._id;
        temp.borrowed_date = e.date;

        usabledDate.setDate(usabledDate.getDate() + 7);
        temp.usable_period_date = usabledDate;

        // 사용가능 기간 ((빌린날짜 + 7day) - 빌린날짜)

        if (e.from_id === null || e.from_id.name === null) {
          temp.shop = "";
        } else {
          temp.shop = e.from_id.name;
        }

        if (e.model === null) {
          temp.model = "";
        } else {
          temp.model = e.model.name;
        }

        tumblers.push(temp);
      });

      return res.json({
        RESULT: 200,
        MESSAGE: "검색 성공",
        tumblers: tumblers,
      });
    });
};

module.exports = callback;
