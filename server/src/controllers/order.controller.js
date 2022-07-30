const Order = require('../models/order.models');
const Product = require('../models/product.models');
const ErrorHandler = require('../utils/errorHandle');
const catchAsyncErrors = require('../middleware/catchAsyncError');

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

const newOrder = catchAsyncErrors(async (req, res, next) => {
  const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } =
    req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  }

  res.status(200).json({
    success: true,
    order,
    message: 'get sigle order success',
  });
});

const updateStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  }

  order.orderStatus = 'Success';

  await order.save();

  res.status(200).json({
    success: true,
    order,
    message: 'update successfully',
  });
});

const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
    message: 'get my orders successfully completed',
  });
});

const myOrdersMe = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
    message: 'get my orders successfully completed',
  });
});

const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  }

  if ((order.orderStatus = 'Delivered')) {
    return next(new ErrorHander('You have already delivered this order', 400));
  }

  if (req.body.status === 'Shipped') {
    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  updateStock,
  deleteOrder,
  myOrdersMe,
  updateStatus,
};
