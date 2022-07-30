const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên sản phẩm!'],
    },
    description: {
      type: String,
      required: [true, 'Vui lòng nhập mô tả của sản phẩm!'],
    },
    price: {
      type: Number,
      required: [true, 'Vui lòng nhập giá của sản phẩm!'],
      maxLength: [10, 'Giá chỉ có max là 10 chữ số nghen!'],
    },
    linkProductOld: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, 'Vui lòng nhập danh mục sản phẩm!'],
    },
    Stock: {
      type: Number,
      required: [true, 'Vui lòng nhập số sản phẩm còn!'],
      maxLength: [5, 'Tối da chỉ có 5 số'],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    resell: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
