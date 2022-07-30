import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/userActions';

const Register = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { isAuthenticated, error } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [avatar, setAvatar] = useState('/Profile.png');
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

  const { name, email, password } = user;

  const handleFormSubmitRegister = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.set('avatar', avatar);
    console.log(avatar + myForm);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: [e.target.value] });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) {
      alert.error(error);
    }
    if (isAuthenticated) {
    }
  }, [error, alert, isAuthenticated]);

  return (
    <div className="center">
      <form className="form" id="form-1" onSubmit={handleFormSubmitRegister}>
        <h3 className="heading">Thành viên đăng ký</h3>
        <p className="desc">Cùng nhau mua sắm tại 2Hand Ecommerce</p>
        <div className="spacer" />
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Tên đầy đủ
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            placeholder="Vd: Hồ Sỹ Bình"
            onChange={registerDataChange}
            className="form-control"
          />
          <span className="form-message" />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={registerDataChange}
            type="text"
            placeholder="Vd: hosybinhdeptroai@gmail.com"
            className="form-control"
          />
          <span className="form-message" />
        </div>
        <div className="form-group">
          <label htmlFor="avatar" className="form-label">
            Avatar
          </label>
          <input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/"
            onChange={registerDataChange}
            placeholder="Vd: linkhinhanh or png"
            className="form-control"
          />
          {avatarPreview && (
            <img
              className="img-avatar"
              width="150px"
              height="150px"
              src={avatarPreview}
              alt="Avatar privew"
            />
          )}
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
            value={password}
            onChange={registerDataChange}
            placeholder="Nhập mật khẩu"
            className="form-control"
          />
          <span className="form-message" />
        </div>
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
        <button className="form-submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default Register;
