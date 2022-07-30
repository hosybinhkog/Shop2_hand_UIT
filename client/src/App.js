import axios from 'axios';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import Footer from './components/commom/Footer';
import Header from './components/commom/Header';
import Cart from './components/pages/Cart';
import ChangePassword from './components/pages/ChangePassword';
import ComfirmOrder from './components/pages/ComfirmOrder';
import ForgotPassword from './components/pages/ForgotPassword';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Payment from './components/pages/Payment';
import ProductDetails from './components/pages/ProductDetails';
import Profile from './components/pages/Profile';
import Register from './components/pages/Register';
import ResetPassword from './components/pages/ResetPassword';
import OrderMe from './components/pages/OrderMe';
import Shipping from './components/pages/Shipping';
import UpdateProfile from './components/pages/UpdateProfile';
import { loadUser } from './redux/actions/userActions';
import store from './redux/store';
import ProtectedRoute from './Routes/ProtectedRoute';
import './sass/index.scss';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/pages/OrderSuccess';
import OrderDetails from './components/pages/OrderDetails';
import Dashboard from './components/pages/Dashboard';
import AdminRoute from './Routes/AdminRoute';
import ProductListAdmin from './components/pages/ProductListAdmin';
import NewProduct from './components/pages/NewProduct';
import UpdateProduct from './components/pages/UpdateProduct';
import OrderList from './components/pages/OrderList';
import Resell from './components/pages/Resell';

function App() {
  const [stripeApiKey, setStripeApiKey] = React.useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('http://localhost:5555/api/v1/payment/stripapikey', {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      withCredentials: true,
    });
    console.log(data);

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route
            path="/user/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/password/update"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          <Route path="/user/cart" element={<Cart />} />

          <Route
            path="/login/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ComfirmOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order/me"
            element={
              <ProtectedRoute>
                <OrderMe />
              </ProtectedRoute>
            }
          />

          <Route
            path="/process/payment"
            element={
              stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                </Elements>
              )
            }
          />

          <Route
            path="/payment/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/product"
            element={
              <AdminRoute>
                <ProductListAdmin />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/product/new"
            element={
              <AdminRoute>
                <NewProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/product/:id"
            element={
              <AdminRoute>
                <UpdateProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/orderlist"
            element={
              <AdminRoute>
                <OrderList />
              </AdminRoute>
            }
          />

          <Route
            path="/user/product/resell/:id"
            element={
              <ProtectedRoute>
                <Resell />
              </ProtectedRoute>
            }
          />

          <Route path="/:keyword" element={<Home />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
