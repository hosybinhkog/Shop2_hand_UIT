import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="center">
      <h3 className="heading" style={{ fontSize: '2rem', fontWeight: 600, marginTop: '3rem' }}>
        Your order has been successfully
      </h3>
      <p style={{ fontSize: '1.6rem', fontWeight: 400, marginTop: '2rem' }} className="desc">
        Cùng nhau mua sắm tại 2Hand Ecommerce
      </p>
      <Link style={{ fontSize: '1.6rem', fontWeight: 300, marginTop: '2rem' }} to="/order/me">
        Xem order của tôi
      </Link>
    </div>
  );
};

export default OrderSuccess;
