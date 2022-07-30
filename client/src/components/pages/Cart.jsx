import React from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addItemsToCart, removeItemsFormCart } from '../../redux/actions/cartAction';
import CartItem from '../CartItem';

const Cart = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (stock <= quantity) {
      alert.show('Sản phẩm chỉ còn ' + stock + ' trong kho');
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    if (1 >= quantity) {
      alert.show('Tối thiểu 1 sản phẩm');
      return;
    }
    dispatch(removeItemsFormCart(id));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemsFormCart(id));
    alert.success('Xóa sản phẩm thành công');
  };

  const checkOutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <>
      <div className="cart">
        <h1 className="cart__title">Giỏ Hàng | E - 2Hand</h1>
        <div className="cart__caption">
          Cùng nhau mua sắm vui vẽ tại <span>E - 2Hand</span>
        </div>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              handleDispatchAdd={increaseQuantity}
              handleOnclickDecrease={decreaseQuantity}
              handleRemoveItem={handleRemoveItem}
              key={item.product}
              item={item}
            />
          ))
        ) : (
          <>
            <h3 style={{ fontSize: '1.5rem', padding: '2rem', textAlign: 'center' }}>
              Chưa có sản phẩm nào trong giỏ hàng
            </h3>
            <div className="back">
              <Link to="/">Xem sản phẩm</Link>
            </div>
          </>
        )}

        <div className="cart__total">
          <h5 className="cart__total__title">
            Tổng số tiền:
            <span>
              {cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </span>
          </h5>
          <button className="btn" onClick={checkOutHandler}>
            Check out
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
