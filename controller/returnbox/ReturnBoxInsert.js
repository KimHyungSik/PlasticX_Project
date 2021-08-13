// returns return box id and fail or success message

const path = require("path");
// acquiring model schema
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { ReturnBox } = require(path.resolve(modelsPath, "ReturnBox"));

const callback = (req, res) => {
  // new schema
  const returnBox = new ReturnBox(req.body);

  returnBox.save((err, returnBoxInfo) => {
    if (err) {
      return res.status(200).json({
        RESULT: 500,
        MESSAGE: "리턴박스 생성 실패",
      });
    }

    return res.status(200).json({
      RESULT: 200,
      MESSAGE: "리턴박스 생성 성공",
      RETURN: returnBoxInfo,
    });
  });
};

module.exports = callback;
