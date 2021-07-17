// Tumbler 생성 코드
// Admin.findOne해서 id찾은 다음
// Tumbler.to_id = Admin_id;

const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Tumbler } = require(path.resolve(modelsPath, "Tumbler"));
const { Admin } = require(path.resolve(modelsPath, "Admin"));

const webCallback = async (req, res) => {
  let result = await register(req.body);
  res.render("tumbler/register", result);
};

const apiCallback = async (req, res) => {
  let result = await register(req.body, res);
  res.status(result.RESULT).json(result);
};

const register = async (data, tumblerInfo) => {
  let tumbler = new Tumbler(data);
  let admin = await Admin.findOne((err, adminInfo) => {
    if (!adminInfo) {
      return console.log("관리자 없음");
    } else {
      return adminInfo;
    }
  });
  tumbler.to_id = admin._id;
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
  };
  return result;
};

module.exports = { api: apiCallback, web: webCallback };
