import { ADD_TO_CART, REMOVE_TO_CART, SAVE_SHOPPING_INFO } from '../../contants';

import axios from 'axios';

const baseUrl = 'http://localhost:5555';

// const config = {
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//     'access-control-allow-origin': 'http://localhost:3000',
//   },
//   withCredentials: true,
// };

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${baseUrl}/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFormCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_TO_CART,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShoppingInfo = (data) => async (dispatch) => {
  dispatch({ type: SAVE_SHOPPING_INFO, payload: data });

  localStorage.setItem('shoppingInfo', JSON.stringify(data));
};
