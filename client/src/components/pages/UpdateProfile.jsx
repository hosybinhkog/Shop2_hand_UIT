import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../contants';
import { loadUser, updateProfile } from '../../redux/actions/userActions';
import Loading from '../commom/Loading';
import Metadata from '../Metadata';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user: userSelect } = useSelector((state) => state.user);

  const { error, isUpdated, loading } = useSelector((state) => state.updateProfile);

  const [user, setUser] = useState({
    name: userSelect.name,
    email: userSelect.email,
  });

  const [avatar, setAvatar] = useState(userSelect.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(userSelect.avatar.url);

  const { name, email } = user;

  const handleFormSubmitRegister = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('avatar', avatar);
    dispatch(updateProfile(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      console.log(e.target.value);
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

    if (isUpdated) {
      alert.success('Profile update successfully');
      dispatch(loadUser());
      navigate('/user/profile');

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [error, alert, isUpdated, navigate, dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title={`${name} : UpdateProfile`} />
          <div className="center">
            <form className="form" id="form-1" onSubmit={handleFormSubmitRegister}>
              <h3 className="heading">Chỉnh sửa thông tin cá nhân</h3>
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
                  placeholder="Vd: link hinh anh or png"
                  className="form-control"
                />
                {avatarPreview && (
                  <img
                    className="img-avatar"
                    width="150px"
                    height="150px"
                    src={avatarPreview}
                    alt="Avatar priview"
                  />
                )}
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
              <button className="form-submit">Thay đổi thông tin </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
