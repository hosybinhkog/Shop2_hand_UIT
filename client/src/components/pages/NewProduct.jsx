import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../contants';
import { clearErrors, createProduct } from '../../redux/actions/productAction';
import Metadata from '../Metadata';
import SideBar from '../SideBar';

const NewProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const categories = [
    {
      display: 'Sản phẩm tiêu hao',
      code: 1,
    },
    {
      display: 'Sản phẩm không tiêu hao',
      code: 2,
    },
  ];

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleFormSubmitNewProduct = (e) => {
    e.preventDefault();

    console.log('Submit new product');

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('price', price);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('Stock', Stock);

    images.forEach((image) => {
      myForm.append('images', image);
    });

    console.log('form', myForm);
    // dispatch(createProduct(myForm));
    // alert.success('Product created successfully');
    // navigate('/admin/dashboard');
    // dispatch({ type: NEW_PRODUCT_RESET });
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  React.useEffect(() => {
    if (success) {
      alert.success('Product created successfully');
      navigate('/admin/dashboard');
      dispatch({ type: NEW_PRODUCT_RESET });
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert, success, navigate]);

  return (
    <>
      <Metadata title="Create new product" />
      <SideBar location={location} />
      <div className="center">
        <form className="form" id="form-1" onSubmit={handleFormSubmitNewProduct}>
          <h3 className="heading">Tạo sản phẩm mới</h3>
          <p className="desc">Cùng nhau mua sắm tại 2Hand Ecommerce</p>
          <div className="spacer" />
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Tên sản phẩm
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              placeholder="Vd: Đép ba lê ba tin gì đóa"
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Giá sản phẩm
            </label>
            <input
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="price"
              placeholder="Vd: 55555"
              className="form-control"
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Miêu tả sản phẩm
            </label>
            <textarea
              value={description}
              id="description"
              name="description"
              type="text"
              cols={5}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Vd: Nhập miêu tả sản phẩm"
              className="form-control col-50"
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
            <label htmlFor="Stock" className="form-label">
              Số lượng
            </label>
            <input
              id="Stock"
              name="Stock"
              type="number"
              value={Stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Nhập số lượng"
              className="form-control"
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
            <label htmlFor="avatar" className="form-label">
              Categories
            </label>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate.id} value={cate.id}>
                  {cate.display}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="avatar" className="form-label">
              Hình Ảnh
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              multiple
              accept="image/"
              onChange={createProductImagesChange}
              placeholder="Vd: link hinh anh or png"
              className="form-control"
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
              {imagesPreview &&
                imagesPreview.map((item, index) => (
                  <img
                    key={index}
                    className="img-avatar"
                    width="150px"
                    height="150px"
                    src={item}
                    alt="Avatar priview"
                  />
                ))}
            </Box>

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
          {/* <Link to="/login">
            <h5 className="create-register">Đăng nhập</h5>
          </Link> */}
          <button type="submit" disabled={loading ? true : false} className="form-submit">
            Tạo sản phẩm
          </button>
        </form>
      </div>
    </>
  );
};

export default NewProduct;
