const callback = (req, res) => {
  res.status(200).json({
    _id: req.admin._id,
    isAuth: true,
    email: req.admin.email,
    name: req.admin.name,
    role: req.admin.role,
  });
};

module.exports = callback;
