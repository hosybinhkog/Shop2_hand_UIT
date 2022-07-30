import React from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Country, State } from 'country-state-city';
import { saveShoppingInfo } from '../../redux/actions/cartAction';
import { useNavigate } from 'react-router-dom';
import Metadata from '../Metadata';

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  console.log({ shippingInfo });

  const [address, setAddress] = React.useState(shippingInfo.address);
  const [city, setCity] = React.useState(shippingInfo.city);
  const [state, setState] = React.useState(shippingInfo.state);
  const [country, setCountry] = React.useState(shippingInfo.country);
  const [pinCode, setPinCode] = React.useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = React.useState(shippingInfo.phoneNo);

  const handleFormShoppingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length > 12 || phoneNo.length < 9) {
      alert.error('Số điện thoại từ 9 - 12 chữ số nha');
      return;
    }
    dispatch(saveShoppingInfo({ address, city, state, country, pinCode, phoneNo }));
    navigate('/order/confirm');
  };

  return (
    <>
      <Metadata title="Shopping details - E2Hand" />
      <div className="center">
        <form
          enctype="multipart/form-data"
          className="form"
          id="form-1"
          onSubmit={handleFormShoppingSubmit}
        >
          <h3 className="heading">Thông tin mua sắm</h3>
          <p className="desc">Cùng nhau mua sắm tại 2Hand Ecommerce</p>
          <div className="spacer" />
          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Địa chỉ
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={address}
              placeholder="vd: đường 1 phường 2"
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
            <label htmlFor="city" className="form-label">
              Thành phố
            </label>
            <input
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="Vd: Thành phố HCM"
              className="form-control"
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
            <label htmlFor="PhoneNo" className="form-label">
              Số điện thoại
            </label>
            <input
              id="PhoneNo"
              name="PhoneNo"
              type="number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              placeholder="Vd: 0123456789"
              className="form-control"
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
            <label htmlFor="pinCode" className="form-label">
              Số nhà
            </label>
            <input
              id="pinCode"
              name="pinCode"
              type="number"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="form-control"
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              style={{
                outline: 'none',
                padding: '1rem',
                border: '1px solid #121212',
                fontSize: '1.6rem',
                fontWeight: '600',
              }}
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {country && (
            <div>
              <select
                style={{
                  outline: 'none',
                  padding: '1rem',
                  border: '1px solid #121212',
                  fontSize: '1.6rem',
                  fontWeight: '600',
                }}
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Thành phố</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <button disabled={state ? false : true} className="form-submit">
            Gửi
          </button>
        </form>
      </div>
    </>
  );
};

export default Shipping;
