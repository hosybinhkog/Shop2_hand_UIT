const Product = require('../models/product.models');
const ErrorHandler = require('../utils/errorHandle');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeature');
const cloudinary = require('cloudinary');

const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 20;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;

  const filteredProductsCount = products.length;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

const getAllProductsResell = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({ resell: true });

  res.status(200).json({
    success: true,
    productResell: products,
  });
});

const createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products',
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const newProduct = await Product.create(req.body);

  if (!newProduct) return next(new ErrorHandler('Create is error', 500));

  res.status(200).json({
    success: true,
    message: 'Product created successfully',
    product: newProduct,
  });
});

const createProductResell = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products',
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const newProduct = await Product.create(req.body);
  newProduct.resell = true;

  await newProduct.save();

  if (!newProduct) return next(new ErrorHandler('Create is error', 500));

  res.status(200).json({
    success: true,
    message: 'Product created successfully',
    product: newProduct,
  });
});

const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let updateProduct = await Product.findById(req.params.id);
  if (!updateProduct) {
    return next(new ErrorHandler('Product is not found', 404));
  }

  let images = [];

  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < images.length; i++) {
      await cloudinary.v2.uploader.destroy(updateProduct.images[i].public_id);
    }
    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'products',
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  updateProduct = await Product.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: 'Product updated successfully',
    product: updateProduct,
    success: true,
  });
});

const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const deleteProduct = await Product.findById(req.params.id);
  if (!deleteProduct) {
    return next(new ErrorHandler('Product is not found', 404));
  }

  for (let i = 0; i < deleteProduct.images.length; i++) {
    await cloudinary.v2.uploader.destroy(deleteProduct.images[i].public_id);
  }

  await deleteProduct.remove();

  res.status(200).json({
    message: 'Product delete successfully',
    success: true,
  });
});

const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product is not found', 404));
  }

  res.status(200).json({
    message: 'Get product details successfully',
    success: true,
    product,
  });
});

const getProductAdmin = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    message: 'get products success fully',
    products,
    success: true,
  });
});

const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  console.log('user id ' + req.user._id);

  const isReview = product.reviews.find((rev) => rev.user === req.user._id);

  if (isReview) {
    product.reviews.forEach((rev) => {
      if (rev.user === req.user._id) (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => (avg += rev.rating));

  product.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('product not found', 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler('product not found', 404));
  }

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((review) => {
    avg += review.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getProductAdmin,
  createProductReview,
  getProductReviews,
  deleteReview,
  createProductResell,
  getAllProductsResell,
};
