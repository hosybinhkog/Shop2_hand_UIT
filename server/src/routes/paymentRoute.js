const express = require('express');
const payment = express.Router();
const paymentController = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middleware/auth');

payment.post('/payment/process', isAuthenticatedUser, paymentController.processPayment);
payment.get('/stripapikey', isAuthenticatedUser, paymentController.sendStripeApiKey);

module.exports = payment;
