const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { TumblerModel } = require(path.resolve(modelsPath, "TumblerModel"));

// const webCallback = async (req, res) => {
//   let result = await register(req.body);
//   console.log(req.date);
//   res.render("tbmodel/register", result);
// };

const apiCallback = async (req, res) => {
  let result = await create(req.body, res);
  console.log(result);
  res.status(result.RESULT).json(result);
};

const create = async (data, tumblerInfo) => {
  let tumblerModel = new TumblerModel(data);
  if (tumblerModel.name.length < 11) {
    await tumblerModel.save();
    return (result = {
      RESULT: 200,
      MESSAGE: "텀블러 모델 생성 성공",
      tumbler_model_id: tumblerModel._id,
      tumbler_model_name: tumblerModel.name,
    });
  } else if (tumblerModel.name.length > 10) {
    console.log("이름 제한");
    return (result = {
      RESULT: 400,
      MESSAGE: "텀블러 이름 제한",
    });
  } else {
    return (result = {
      RESULT: 500,
      MESSAGE: "실패",
    });
  }
};

//module.exports = { api: apiCallback, web: webCallback };
module.exports = { api: apiCallback };
