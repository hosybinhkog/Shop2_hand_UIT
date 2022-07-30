const ErrorHandler = require('../utils/errorHandle');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const User = require('../models/user.models');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale',
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 200, res);
});

const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler('Vui lòng nhập tài khoản/mật khẩu...', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Không tồn tại tài khoản mật khẩu', 401));
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Tài khoản hay mật khẩu không đúng', 401));
  }

  sendToken(user, 200, res);
});

const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  const tokenReset = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}:/api/v1/user/password/reset/${tokenReset}`;

  const message = `Your password reset token is ${resetPasswordUrl} you have a link`;
  console.log(message);

  try {
    await sendEmail({
      email: user.email,
      subject: 'Ecommerce password recovery',
      message,
      html: '<b>BBBB</b>',
    });

    res.status(200).json({
      message: 'success to sendEmail' + message,
      code: 200,
      success: true,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler('server internal :  ' + error.message, 500));
  }
});

const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password not matched', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler('User not found or not logged in', 404));
  }
  res.status(200).json({
    success: true,
    user,
    message: 'get user details successfully completed',
  });
});

const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password not match', 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

const getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    users,
    message: 'get all user successfully',
  });
});

const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler('user not found', 404));
  }

  res.status(200).json({
    user,
    message: 'get user successfully',
    success: true,
  });
});

const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
    message: 'update role successfully',
  });
});

const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler('user not found'), 404);
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  updateProfile,
};
