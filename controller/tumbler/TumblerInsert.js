const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));

const webCallback = async (req, res) => {
  let result = await register(req.body);
  console.log(req.date);
  res.render("tumbler/register", result);
};

const apiCallback = async (req, res) => {
  let result = await register(req.body, res);
  console.log(result);
  res.status(result.RESULT).json(result);
};

const register = async (data, tumblerInfo) => {
  let tumbler = new Tumbler(data);
  try {
    await tumbler.save();
  } catch (err) {
    result = {
      RESULT: 500,
      MESSAGE: "실패",
    };
  }
  result = {
    RESULT: 200,
    MESSAGE: "텀블러 생성 성공",
    tumbler_id: tumbler._id,
    //name: tumbler.design.name,
  };
  return result;
};

module.exports = { api: apiCallback, web: webCallback };
