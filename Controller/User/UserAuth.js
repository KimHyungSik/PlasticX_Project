const callback = (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  });
};

module.exports = callback;
