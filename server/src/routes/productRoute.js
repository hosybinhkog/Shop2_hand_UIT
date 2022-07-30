const express = require('express');
const productController = require('../controllers/product.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const productRoute = express.Router();
productRoute.get('/resell', productController.getAllProductsResell);

productRoute.get('/', productController.getAllProducts);

productRoute.get(
  '/admin',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  productController.getProductAdmin
);

productRoute.post(
  '/',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  productController.createProduct
);

productRoute.put('/review', isAuthenticatedUser, productController.createProductReview);

productRoute.get('/reviews', productController.getProductReviews);

productRoute.delete('/reviews', isAuthenticatedUser, productController.deleteReview);

productRoute.post('/resell', isAuthenticatedUser, productController.createProductResell);

productRoute.put(
  '/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  productController.updateProduct
);
productRoute.delete(
  '/delete/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  productController.deleteProduct
);
productRoute.get('/:id', productController.getProductDetails);

module.exports = productRoute;
