const express = require('express');
const productRouter = require('./productRoute');
const userRoute = require('./userRoute');
const orderRoute = require('./order');
const payment = require('./paymentRoute');
const Router = express.Router();

Router.use('/api/v1/product', productRouter);
Router.use('/api/v1/user', userRoute);
Router.use('/api/v1/order', orderRoute);
Router.use('/api/v1/payment', payment);

module.exports = Router;
