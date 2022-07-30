import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from '../../contants';
import { clearErrors, createProductResell, getDetails } from '../../redux/actions/productAction';
import Metadata from '../Metadata';

const Resell = () => {
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

  const params = useParams();

  const productId = params.id;

  const { error, product } = useSelector((state) => state.productDetails);
  const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const handleFormSubmitNewProduct = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('price', price);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('Stock', Stock);
    myForm.set('resell', true);
    myForm.set('linkProductOld', `/product/${productId}`);
    images.forEach((image) => {
      myForm.append('images', image);
    });
    dispatch(createProductResell(myForm));
    alert.success('Product created successfully');
    navigate('/admin/dashboard');
    dispatch({ type: NEW_PRODUCT_RESET });
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getDetails(productId));
    } else {
      setName(product.name);
      // setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Product Updated Successfully');
      navigate('/admin/products');
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [error, dispatch, alert, updateError, navigate, isUpdated, product, productId]);

  return (
    <>
      <Metadata title="Resell Sản Phẩm" />
      <div className="center">
        <form className="form" id="form-1" onSubmit={handleFormSubmitNewProduct}>
          <h3 className="heading">Resell sản phẩm</h3>
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
            <label htmlFor="link" className="form-label">
              Link sản phẩm gốc
            </label>
            <input
              id="link"
              name="link"
              value={`http://localhost:3000/product/${productId}`}
              onChange={(e) => setPrice(e.target.value)}
              disabled
              className="form-control opacity-05"
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Miêu tả sản phẩm đã sử dụng như thế nào
            </label>
            <textarea
              value={description}
              id="description"
              name="description"
              type="text"
              cols={5}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="
              1. Độ mới
              2. Lỗi trong quá trình sử dụng nếu có
              3. Thời gian bảo hành nếu có
              4. Thời gian đã sử dụng 
              5. Lý do bạn muốn bán lại

              "
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
            <select
              defaultValue={categories[0].display}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Choose Category</option>
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
              {oldImages &&
                oldImages.map((item, index) => (
                  <img
                    key={index}
                    className="img-avatar"
                    width="150px"
                    height="150px"
                    src={item.url}
                    alt="Avatar priview"
                  />
                ))}
            </Box>
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
          <button type="submit" disabled={loading ? true : false} className="form-submit">
            Resell sản phẩm
          </button>
        </form>
      </div>
    </>
  );
};

export default Resell;
