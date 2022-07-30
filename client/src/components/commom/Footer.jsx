import React from 'react';
import imgGG from '../../assets/img/google_play.png';
import appStore from '../../assets/img/app_store.png';
import qrCode from '../../assets/img/qr_code.png';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="grid">
        <div className="grid__row">
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Chăm sóc khách hàng</h3>
            <ul className="footer-list">
              <li className="footer-item">
                <a href className="footer-item__link">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li className="footer-item">
                <a href className="footer-item__link">
                  2Hand - Ecommerce mail
                </a>
              </li>
              <li className="footer-item">
                <a href className="footer-item__link">
                  Hướng dẫn mua hàng
                </a>
              </li>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Giới thiệu</h3>
            <ul className="footer-list">
              <li className="footer-item">
                <a href className="footer-item__link">
                  Giới thiệu
                </a>
              </li>
              <li className="footer-item">
                <a href className="footer-item__link">
                  Tuyển dụng
                </a>
              </li>
              <li className="footer-item">
                <a href className="footer-item__link">
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Danh mục</h3>
            <ul className="footer-list">
              <li className="footer-item">
                <a href className="footer-item__link">
                  Trang điểm mặt
                </a>
              </li>
              <li className="footer-item">
                <a href className="footer-item__link">
                  Trang điểm mũi
                </a>
              </li>
              <li className="footer-item">
                <a href className="footer-item__link">
                  Trang điểm môi
                </a>
              </li>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Theo dõi</h3>
            <ul className="footer-list">
              <li className="footer-item">
                <a href className="footer-item__link">
                  <i className="footer-item__icon bx bxl-facebook-circle" />
                  Facebook
                </a>
              </li>
              <li className="footer-item">
                <a href className="footer-item__link">
                  <i className="footer-item__icon bx bxl-instagram" />
                  Instagram
                </a>
              </li>
              <li className="footer-item">
                <a href className="footer-item__link">
                  <i className="footer-item__icon bx bxl-linkedin" />
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Vào cửa hàng trên ứng dụng</h3>
            <div className="footer__download">
              <img src={qrCode} alt="Download QR" className="footer__download-qr" />
              <div className="footer__download-apps">
                <a href className="footer__download-app-link">
                  <img src={imgGG} alt="Google play" className="footer__download-app-img" />
                </a>
                <a href className="footer__download-app-link">
                  <img src={appStore} alt="App store" className="footer__download-app-img" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="grid">
          <p className="footer__text">2022 - bản quyền thuộc về 2hand-shopee</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
