import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { clearErrors, login } from '../../redux/actions/userActions';

const Login = () => {
  const navigation = useNavigate();

  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isAuthenticated } = useSelector((state) => state.user);


  const location = useLocation();


  const redirect = location.search ? location.search.split('=')[1] : '/';
  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigation(`${redirect}`);
    }
  }, [dispatch, error, alert, isAuthenticated, navigation, redirect]);

  const handleFormSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(login(emailLogin, passwordLogin));
  };
  return (
    <div className="center">
      <form className="form" onSubmit={handleFormSubmitLogin}>
        <h3 className="heading">Đăng nhập</h3>
        <p className="desc">Cùng nhau mua sắm tại 2Hand Ecommerce</p>
        <div className="spacer" />
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
            placeholder="Vd: hosybinhdeptroai@gmail.com"
            className="form-control"
          />
          <span className="form-message" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
            placeholder="Nhập mật khẩu"
            className="form-control"
          />
          <span className="form-message" />
        </div>
        <Link to="/password/forgot">
          <p>Quên mật khẩu</p>
        </Link>
        <Link to="/register">
          <h5 className="create-register">Tạo tài khoản</h5>
        </Link>
        <button type="submit" className="form-submit">
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
