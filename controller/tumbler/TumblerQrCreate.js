const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));

const callback = (req, res) => {
  Tumbler.findOne(req.params, (err, tumblerInfo) => {
    if (err) {
      return res.json({
        MESSAGE: "텀블러 없엉",
      });
    }
    return res.json({
      MESSAGE: "텀블러",
      tumbler_id: tumblerInfo._id,
    });
    // 1. 텀블러 대여 중인가 (state = false)

    // 2. user 보증금 >= 5000 인가

    // 3. 위에 두개 만족하면 state = true

    // 4. user 보증금 - 5000

    // from_id = to_id
    // to_id = user_id
    // date 추가
  });
};

module.exports = callback;
