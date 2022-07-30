import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NEW_REVIEW_RESET } from '../../contants';
import { addItemsToCart } from '../../redux/actions/cartAction';
import { clearErrors, getDetails, newReview } from '../../redux/actions/productAction';
import Loading from '../commom/Loading';
import Metadata from '../Metadata';
import ReviewCard from '../ReviewCard';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const { loading, error, product } = useSelector((state) => state.productDetails);

  const { success, error: reviewError } = useSelector((state) => state.newReview);

  const math = useParams();
  const alert = useAlert();

  const [quanlity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set('rating', rating);
    myForm.set('comment', comment);
    myForm.set('productId', params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemsToCart(math.id, quanlity));
    alert.success('Add cart successfully');
  };

  useEffect(() => {
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Review Submitted Successfully');
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getDetails(math.id));
    window.scrollTo(0, 0);
  }, [dispatch, math, error, alert, reviewError, success]);

  const options = {
    value: product.rating,
    readOnly: true,
    size: 'large',
  };

  const decreaseQuantity = () => {
    if (product.Stock <= quanlity) return;
    setQuantity((quanlity) => quanlity + 1);
  };

  const imcreaseQuantity = () => {
    if (quanlity === 1) return;
    setQuantity((quanlity) => quanlity - 1);
  };

  return (
    <>
      <h1 className="product-details-title">Chi tiết sản phẩm</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title={`${product.name} - 2HandEcommerce`} />
          <div className="product-details">
            <div className="product-details-left">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="product-details-image"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="product-details-right">
              <div className="product-details-content">
                <h2 className="product-details-content-title">{product.name}</h2>
                <p>Sp {product._id}</p>
              </div>
              <div className="product-details-block">
                <Rating {...options} />
                <span>({product.numOfReviews} Đánh giá)</span>
              </div>
              <div className="product-details-block-1">
                <h1>
                  {`${
                    product.price
                      ? product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })
                      : '0.000'
                  }`}
                </h1>
                <div className="product-details-block-2">
                  <div className="product-details-block-3">
                    Số lượng:
                    <button onClick={imcreaseQuantity}>-</button>
                    <input type="number" value={quanlity} />
                    <button onClick={decreaseQuantity}>+</button>
                  </div>
                  <button onClick={handleAddToCart} className="add-cart">
                    Thêm vào giỏ hàng
                  </button>
                </div>
                <p className="stock-status">
                  Status:{' '}
                  <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                    {product.Stock < 1 ? 'Hết trong kho' : 'Trong kho'}
                  </b>
                </p>
              </div>
              <div className="product-details-block-4">
                Mô tả : <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submit__reviews">
                Thêm đánh giá
              </button>
              {product.linkProductOld && (
                <p className="stock-status">
                  Nhấn vào đây để xem sản phẩm cũ{' '}
                  <span>
                    <Link to={product.linkProductOld}>Ở đây</Link>
                  </span>
                </p>
              )}
            </div>
          </div>
          <h2 className="reviews__heading">Reviews</h2>

          <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => {
                  setRating(e.target.value);
                }}
                value={rating}
                size="large"
              />
              <textarea
                cols="30"
                rows="5"
                className="submitDialogTextArea"
                placeholder="Nhập bình luận vào đây"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review) => <ReviewCard review={review} />)
          ) : (
            <p className="not_reviews">Chưa có đánh giá nào về sản phẩm!</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
