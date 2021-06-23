const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const adminSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
});

// 회원가입 save 되기 전 bcrypt로 비밀번호 암호화
adminSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

adminSchema.methods.comparePassword = function (plainPassword, callback) {
  // plainPassword가 DB에 있는 암호화된 password와 같은지 확인
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

adminSchema.methods.generateToken = function (callback) {
  // jsonwebtoken을 이용해서 token을 생성한다.
  var admin = this;
  var token = jwt.sign(admin._id.toHexString(), "secretToken");
  admin.token = token;
  admin.save(function (err, admin) {
    if (err) return callback(err);
    callback(null, admin);
  });
};

adminSchema.statics.findByToken = function (token, callback) {
  var admin = this;

  // 토큰을 복호화 한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

    admin.findOne({ _id: decoded, token: token }, function (err, admin) {
      if (err) return callback(err);
      callback(null, admin);
    });
  });
};

const Admin = mongoose.model("admins", adminSchema);

module.exports = { Admin };
