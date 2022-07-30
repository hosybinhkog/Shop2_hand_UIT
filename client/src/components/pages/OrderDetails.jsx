import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../commom/Loading';
import Metadata from '../Metadata';
import { clearErrors, getOrderDetails } from '../../redux/actions/orderActions';
import { Link, useNavigate, useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();
  console.log(order);

  const processToPayment = () => {
    navigate('/');
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    console.log(params.id);
    dispatch(getOrderDetails(params.id));
  }, [error, dispatch, alert, params]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title="OrderDetails - 2Hand" />
          <div className="confirm">
            <h3 className="confirm__title">Thông tin đơn hàng</h3>
            <div className="confirm__info">
              <div className="confirm__info__box">
                <p>Name : </p>
                <span>{order.user && order.user.name}</span>
              </div>
              <div className="confirm__info__box">
                <p>Phone : </p>
                <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
              </div>
              <div className="confirm__info__box">
                <p>Address : </p>
                <span>
                  {order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                </span>
              </div>
            </div>
            <hr />
            <br />{' '}
            <div className="confirm__cartItems">
              <h4 className="confirm__cartItems__title">Các sản phẩm của bạn</h4>

              <div className="category">
                <h5>Hình ảnh</h5>
                <h5>Tên sản phẩm</h5>
                <h5>Tổng giá</h5>
                <h5>Tính năng</h5>
              </div>
              <div className="confirm__cartItems__container">
                {order.orderItems &&
                  order.orderItems.map((cartItem) => (
                    <div key={cartItem.product} className="confirm__cartItems__container__item">
                      <img
                        src={cartItem.image}
                        alt=""
                        className="confirm__cartItems__container__img"
                      />
                      <Link style={{ textAlign: 'center' }} to={`/product/${cartItem.product}`}>
                        {cartItem.name}
                      </Link>
                      <span>
                        {cartItem.quantity} x {cartItem.price} ={' '}
                        <b>${cartItem.quantity * cartItem.price}</b>
                      </span>
                      {order.orderStatus === 'Success' ? (
                        <Link to={`/user/product/resell/${cartItem.product}`}>
                          <button className="card-item__footer__btn btn-red">Bán lại</button>
                        </Link>
                      ) : (
                        <button disabled className="card-item__footer__btn btn-red">
                          Chưa nhận hàng
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <br />
            <hr />
            <div className="confirm__order__summary">
              <h3 className="confirm__order__summary__title">Order Summary</h3>
              <div className="confirm__order__summary__container">
                <div className="confirm__order__summary__container__box">
                  <p>Subtotal : </p>
                  <span>${order.itemsPrice}</span>
                </div>
                <div className="confirm__order__summary__container__box">
                  <p>Shipping Charges : </p>
                  <span>${order.shippingPrice}</span>
                </div>
                <div className="confirm__order__summary__container__box">
                  <p>GST : </p>
                  <span>${order.taxPrice}</span>
                </div>
                <div className="confirm__order__summary__container__box">
                  <p>Status : </p>
                  <span>${order.orderStatus}</span>
                </div>
              </div>
              <div className="order__total">
                <p>
                  <b>Total :</b>
                </p>
                <span>${order.totalPrice && order.totalPrice}</span>
              </div>
              <div className="btn__confirm">
                <button className="btn-confirm" onClick={processToPayment}>
                  Back to Homepage
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
