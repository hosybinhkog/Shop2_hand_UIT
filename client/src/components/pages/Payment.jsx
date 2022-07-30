import React, { useRef } from 'react';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import Metadata from '../Metadata';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createOrder } from '../../redux/actions/orderActions';

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round((orderInfo.totalPrice * 100) / 25),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal / 25,
    taxPrice: orderInfo.tax / 25,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice / 25,
  };

  const handleSubmitFormPayment = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `http://localhost:5555/api/v1/payment/payment/process`,
        paymentData,
        config
      );

      console.log(data + ' processed');

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          navigate('/payment/success');
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <Metadata title="Payment - 2Hand" />
      <div className="center">
        <form className="form" id="form-1" onSubmit={handleSubmitFormPayment}>
          <h3 className="heading">Payment Info</h3>
          <p className="desc">Cùng nhau mua sắm tại 2Hand Ecommerce</p>
          <div className="spacer" />
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Credit Card
            </label>
            <CardNumberElement className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              CardExpiry
            </label>
            <CardExpiryElement className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Card cvc
            </label>
            <CardCvcElement className="form-control" />
          </div>
          <button type="submit" ref={payBtn} className="form-submit">
            Pay - ${orderInfo && orderInfo.totalPrice / 25000}
          </button>
        </form>
      </div>
    </>
  );
};

export default Payment;
