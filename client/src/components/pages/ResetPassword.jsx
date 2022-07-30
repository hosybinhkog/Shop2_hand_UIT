import React from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearErrors, resetPassword } from '../../redux/actions/userActions';
import Metadata from '../Metadata';
const ResetPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const location = useParams();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.password);

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set('password', password);
    myForm.set('confirmPassword', confirmPassword);
    dispatch(resetPassword(location.token, myForm));
  };

  React.useEffect(() => {
    if (success) {
      alert.success('Đổi mật khẩu thành công');
      navigate('/');
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert, success, navigate]);
  return (
    <>
      <Metadata title={`Reset password - 2Hand-Ecommerce`} />
      <div className="center">
        <form className="form" id="form-1" onSubmit={handleForgotPassword}>
          <h3 className="heading">Reset mật khẩu của bạn</h3>
          <p className="desc">Cùng nhau mua sắm tại 2Hand Ecommerce</p>
          <div className="spacer" />
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password mới
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              placeholder="vd: hosybinhkog@gmail.com"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Xác nhận lại password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Xác nhận lại mật khẩu mới"
              className="form-control"
            />
            <span className="form-message" />
          </div>
          <Link to="/register">
            <h5 className="create-register">Đăng ký</h5>
          </Link>
          <p style={{ textAlign: 'center' }}>{error && error}</p>
          <button className="form-submit">Gửi</button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
