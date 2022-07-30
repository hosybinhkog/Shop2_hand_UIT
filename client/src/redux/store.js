import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import productReducer, {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducerResell,
  productReducerSingle,
} from './reducers/productReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import {
  myOrdersReducer,
  newOrderReducer,
  orderRetailsReducer,
  updateOrderStatus,
} from './reducers/orderReducer';

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
};

const reducers = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  updateProfile: profileReducer,
  password: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderRetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducerSingle,
  productResell: productReducerResell,
  updateOrderStatus: updateOrderStatus,
});

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
