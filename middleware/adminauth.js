const path = require("path");
const modelsPath = path.resolve(__dirname, "..", "models");

const { Admin } = require(path.resolve(modelsPath, "Admin"));

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;

  Admin.findByToken(token, (err, admin) => {
    if (err) throw err;
    if (!admin) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.admin = admin;
    next();
  });
};

module.exports = { auth };
