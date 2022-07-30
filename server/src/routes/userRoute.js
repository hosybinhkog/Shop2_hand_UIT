const express = require('express');
const userController = require('../controllers/user.controller');
const userRoute = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

userRoute.post('/register', userController.registerUser);
userRoute.post('/login', userController.loginUser);
userRoute.get('/logout', userController.logout);
userRoute.post('/change-password', userController.forgotPassword);
userRoute.put('/password/reset/:token', userController.resetPassword);
userRoute.get('/me', isAuthenticatedUser, userController.getUserDetails);

userRoute.put('/password/update', isAuthenticatedUser, userController.updatePassword);
userRoute.put('/me/update', isAuthenticatedUser, userController.updateProfile);
userRoute.get(
  '/admin/users',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  userController.getAllUser
);

userRoute.get(
  '/admin/user/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  userController.getSingleUser
);

userRoute.put(
  '/admin/user/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  userController.updateUserRole
);

userRoute.delete(
  '/admin/user/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  userController.deleteUser
);

module.exports = userRoute;
