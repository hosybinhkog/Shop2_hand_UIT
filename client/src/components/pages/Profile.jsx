import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../commom/Loading';
import Metadata from '../Metadata';

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('first', isAuthenticated);
    if (isAuthenticated === undefined) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Metadata title={`${user.name} - 2hand-shop`} />
          <div className="profile-container">
            <div className="profile-container-top">
              <h3>Hồ sơ của tôi</h3>
              <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
              <img
                src={
                  user.avatar && user.avatar.url !== 'profilePicUrl'
                    ? user.avatar.url
                    : 'https://thumbs.dreamstime.com/b/vector-illustration-isolated-white-background-user-profile-avatar-black-line-icon-user-profile-avatar-black-solid-icon-121102166.jpg'
                }
                alt={user.name}
              />
              <Link className="btn-profile" to="/me/update">
                Chỉnh sửa
              </Link>
            </div>
            <div className="profile-container-bottom">
              <div className="profile-container-bottom-title">
                <h4>Thông tin</h4>
              </div>
              <div>
                <h4>Full name :</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email :</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On :</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>
              <div>
                <Link className="btn-profile" to="/user/cart">
                  Giỏ hàng của tôi
                </Link>
                <Link className="btn-profile" to="/user/password/update">
                  Đổi mật khẩu
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
