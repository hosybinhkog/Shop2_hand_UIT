import React from 'react';
import { NavLink } from 'react-router-dom';

const CartItem = ({ item, handleDispatchAdd, handleOnclickDecrease, handleRemoveItem }) => {
  return (
    <>
      <div className="card-item">
        <div className="card-item__header">
          <img className="card-item__header__img" src={item.image} alt="" />
          <div className="card-item__header__content">
            <NavLink to={`/product/${item.product}`}>
              <h5 className="card-item__header__content__title">{item.name}</h5>
            </NavLink>
            <div className="card-item__header__content__quantity">
              <button onClick={() => handleOnclickDecrease(item.product, item.quantity)}>-</button>
              <p className="card-item__header__content__stock">
                Số lượng :{item.quantity ? item.quantity : 1}
              </p>
              <button onClick={() => handleDispatchAdd(item.product, item.quantity, item.stock)}>
                +
              </button>
            </div>
          </div>
          <div className="card-item__header__price">
            <span>
              Giá : {item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </span>
          </div>
        </div>
        <div className="card-item__total">
          <i className="bx bxs-cart-add"></i>
          <span>Tổng số tiền :</span>
          {(item.price * item.quantity).toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
          })}
        </div>
        <div className="card-item__footer">
          {/* <button className="card-item__footer__btn btn-red">Resell</button> */}
          {/* <button className="card-item__footer__btn btn-orange">Đánh giá</button> */}
          <button className="card-item__footer__btn btn-white ">Liên hệ người bán</button>
          {/* <button className="card-item__footer__btn btn-white ">Mua lại</button> */}
          <button
            onClick={() => handleRemoveItem(item.product)}
            className="card-item__footer__btn btn-remove"
          >
            Xóa khỏi giỏ hàng
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
