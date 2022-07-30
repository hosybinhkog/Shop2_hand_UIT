import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    value: product.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  return (
    <Link className="product__card" to={`/product/${product._id}`}>
      <img
        src={
          product.images[0].url
            ? product.images[0].url
            : 'https://lh3.googleusercontent.com/oucDcDAOVG1fLnm_XdisT0Sp3c72sI8JuR_PWKWmeXBn5_rNadTd7pW3FXuGQrOz8zHwhlhX2OYCPGBzfHNR_X8LWg=w640-h400-e365-rj-sc0x00ffffff  '
        }
        alt={product.name}
      />
      <h5 className="product__card__title">{product.name}</h5>
      <div className="product__card__stars">
        <ReactStars {...options} />
        <span>({product.numOfReviews} reviews)</span>
      </div>
      <span className="product__card__price">
        {product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
      </span>
    </Link>
  );
};

export default Product;
