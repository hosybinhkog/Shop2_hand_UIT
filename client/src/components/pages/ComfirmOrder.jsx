import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Metadata from '../Metadata';

const ComfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const navigate = useNavigate();

  const processToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(data));

    navigate('/process/payment');
  };

  return (
    <>
      <Metadata title="Order confirm - 2Hand" />
      <div className="confirm">
        <h3 className="confirm__title">Xác nhận thông tin order</h3>
        <div className="confirm__info">
          <div className="confirm__info__box">
            <p>Name : </p>
            <span>{user.name}</span>
          </div>
          <div className="confirm__info__box">
            <p>Phone : </p>
            <span>{shippingInfo.phoneNo}</span>
          </div>
          <div className="confirm__info__box">
            <p>Address : </p>
            <span>{address}</span>
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
          </div>
          <div className="confirm__cartItems__container">
            {cartItems &&
              cartItems.map((cartItem) => (
                <div key={cartItem.product} className="confirm__cartItems__container__item">
                  <img src={cartItem.image} alt="" className="confirm__cartItems__container__img" />
                  <Link to={`/product/${cartItem.product}`}>{cartItem.name}</Link>
                  <span>
                    {cartItem.quantity} x{' '}
                    {cartItem.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })} ={' '}
                    <b>
                      {(cartItem.quantity * cartItem.price).toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </b>
                  </span>
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
              <span>{subtotal.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
            </div>
            <div className="confirm__order__summary__container__box">
              <p>Shipping Charges : </p>
              <span>
                {shippingCharges.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
              </span>
            </div>
            <div className="confirm__order__summary__container__box">
              <p>GST : </p>
              <span>${tax.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
            </div>
          </div>
          <div className="order__total">
            <p>
              <b>Total :</b>
            </p>
            <span>${totalPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
          </div>
          <div className="btn__confirm">
            <button className="btn-confirm" onClick={processToPayment}>
              ProcessToPayment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComfirmOrder;
