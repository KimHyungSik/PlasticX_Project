const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));

const apiCallback = (req, res) => {
  if (!Object.keys(req.params).length) {
    return res.status(200).json({
      RESULT: 401,
      MESSAGE: "요청 값 없음",
    });
  }
  Tumbler.findOne(req.params)
    .populate("model")
    .populate("from_id")
    .exec(async (err, tumblerInfo) => {
      let temp = new Object();
      temp.model = tumblerInfo.model.name;
      temp.from_id = tumblerInfo.from_id.name;

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
      } else if (!tumblerInfo) {
        return res.status(200).json({
          RESULT: 400,
          MESSAGE: "텀블러 없음",
        });
      }
      return res.status(200).json({
        RESULT: 200,
        MESSAGE: "성공",
        RETURN: temp,
      });
    });
};

const webCallback = async (req, res) => {
  let tumblers = await Tumbler.find().lean();
  res.render("tumbler/inquire", {
    title: "텀블러 조회",
    tumblers: tumblers,
  });
};

module.exports = { api: apiCallback, web: webCallback };
