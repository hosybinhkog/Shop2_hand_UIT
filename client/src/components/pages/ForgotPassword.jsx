import React from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, forgotPassword } from '../../redux/actions/userActions';
import Metadata from '../Metadata';

const ForgotPassword = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, message } = useSelector((state) => state.password);

  const [email, setEmail] = React.useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  React.useEffect(() => {
    if (message) {
      alert.success(message);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert, navigate, message]);

  return (
    <>
      <Metadata title={`Forgot-Password 2Hand-Ecommerce`} />
      <div className="center">
        <form className="form" id="form-1" onSubmit={handleForgotPassword}>
          <h3 className="heading">Quên mật khẩu cá nhân</h3>
          <p className="desc">Cùng nhau mua sắm tại 2Hand Ecommerce</p>
          <div className="spacer" />
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email của bạn
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              placeholder="vd: hosybinhkog@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
            <span className="form-message" />
          </div>
          {/* <div className="form-group">
            <label htmlFor="passwordNew" className="form-label">
              Mật khẩu mới
            </label>
            <input
              id="passwordNew"
              name="passwordNew"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="Mật khẩu mới"
              className="form-control"
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Điền lại mật khẩu mới
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Điền lại mật khẩu mới"
              className="form-control"
            />
            <span className="form-message" />
          </div> */}
          {/* <div className="form-group">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={registerDataChange}
            placeholder="Nhập mật khẩu"
            className="form-control"
          />
          <span className="form-message" />
        </div> */}
          {/* <div className="form-group">
          <label htmlFor="password_confirmation" className="form-label">
            Nhập lại mật khẩu
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            placeholder="Nhập lại mật khẩu"
            type="password"
            className="form-control"
          />
          <span className="form-message" />
        </div> */}
          <Link to="/login">
            <h5 className="create-register">Đăng nhập</h5>
          </Link>
          <p style={{ textAlign: 'center' }}>{error && error}</p>
          <button className="form-submit">Gửi</button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
