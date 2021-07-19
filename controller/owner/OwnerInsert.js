const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { Owner } = require(path.resolve(modelsPath, "Owner"));

const apiCallback = async (req, res) => {
  let result = await create(req.body, res);
  console.log(result);
  res.status(result.RESULT).json(result);
};

const create = async (data, ownerInfo) => {
  let owner = new Owner(data);
  try {
    await owner.save();
  } catch (err) {
    result = {
      RESULT: 500,
      MESSAGE: "실패",
    };
  }
  result = {
    RESULT: 200,
    MESSAGE: "카페 생성 성공",
    shop_id: owner._id,
    shop_name: owner.name,
  };
  return result;
};

//module.exports = { api: apiCallback, web: webCallback };
module.exports = { api: apiCallback };
