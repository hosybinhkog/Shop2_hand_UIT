const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên!'],
      minLength: [4, 'Tên phải nhiều hơn 4 chữ'],
      maxLength: [30, 'Tối ta 30 chữ'],
    },
    email: {
      type: String,
      required: [true, 'Vui lòng nhập email'],
      unique: true,
      validate: [validator.isEmail, 'Vui lòng nhập email'],
    },
    password: {
      type: String,
      required: [true, 'Vui lòng nhập password'],
      minLength: [8, 'Mật khẩu phải lớn hơn 8 chữ'],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY_TOKEN, {
    expiresIn: process.env.EXPIRES_IN_SECONDS,
  });
};

userSchema.methods.comparePassword = async function (passwordInput) {
  return await bcrypt.compare(passwordInput, this.password);
};

userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = await crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = await crypto.createHash('sha256').update(resetToken).digest('hex');

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
