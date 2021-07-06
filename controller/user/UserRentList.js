const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));
const { User } = require(path.resolve(modelsPath, "User"));

const callback = (req, res) => {
  let tumbler_id = [];
  let tumbler_model = [];
  Tumbler.find(req.params, async (err, tumblerInfo) => {
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
      tumbler_id.push(e._id);
      tumbler_model.push(e.design);
      console.log(e.date);
    });
    return res.json({
      RESULT: 200,
      MESSAGE: "검색 성공",
      tumbler_id: tumbler_id,
      tumbler_model: tumbler_model,
    });
  });
};

module.exports = callback;
