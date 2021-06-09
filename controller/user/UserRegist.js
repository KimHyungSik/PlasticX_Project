const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "..", "models");
const { User } = require(path.resolve(modelsPath, "User"));

const callback = (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) throw err;
    return res.status(200).json({
      RESULT: 200,
      MESSAGE: "성공",
      user_id: user._id,
    });
  });
};

module.exports = callback;
