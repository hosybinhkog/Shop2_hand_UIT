const express = require('express');
const orderController = require('../controllers/order.controller');
const orderRoute = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

orderRoute.post('/new', isAuthenticatedUser, orderController.newOrder);

orderRoute.get('/me', isAuthenticatedUser, orderController.myOrdersMe);

orderRoute.get(
  '/admin',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  orderController.getAllOrders
);

orderRoute.put(
  '/admin/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  orderController.updateOrder
);

orderRoute.delete(
  '/admin/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  orderController.deleteOrder
);

orderRoute.get('/:id', isAuthenticatedUser, orderController.getSingleOrder);

orderRoute.get('/updateStatus/:id', isAuthenticatedUser, orderController.updateStatus);

module.exports = orderRoute;
