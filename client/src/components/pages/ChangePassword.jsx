import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../contants';
import { clearErrors, updatePassword } from '../../redux/actions/userActions';
import Metadata from '../Metadata';

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated } = useSelector((state) => state.updateProfile);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleFormSubmitChangePassword = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('oldPassword', oldPassword);
    myForm.set('newPassword', newPassword);
    myForm.set('confirmPassword', confirmPassword);

    dispatch(updatePassword(myForm));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Profile update successfully');
      navigate('/user/profile');

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [error, alert, isUpdated, navigate, dispatch]);

  return (
    <>
      <Metadata title={`ChangePassword`} />
      <div className="center">
        <form className="form" id="form-1" onSubmit={handleFormSubmitChangePassword}>
          <h3 className="heading">Chỉnh sửa mật khẩu cá nhân</h3>
          <p className="desc">Cùng nhau mua sắm tại 2Hand Ecommerce</p>
          <div className="spacer" />
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mật khẩu hiện tại
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={oldPassword}
              placeholder="Mật khẩu hiện tại"
              onChange={(e) => setOldPassword(e.target.value)}
              className="form-control"
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
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
          </div>
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
          {/* <Link to="/login">
          <h5 className="create-register">Đăng nhập</h5>
        </Link> */}
          <p style={{ textAlign: 'center' }}>{error && error}</p>
          <button className="form-submit">Thay đổi thông tin </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
