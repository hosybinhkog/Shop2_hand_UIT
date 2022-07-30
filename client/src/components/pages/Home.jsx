import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, getProductResell } from '../../redux/actions/productAction';
import Loading from '../commom/Loading';
import Metadata from '../Metadata';
import Product from '../Product';

import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Typography } from '@mui/material';

const categoriesData = [
  {
    id: '1',
    name: 'Sản phẩm tiêu hao',
  },
  {
    id: '2',
    name: 'Sản phẩm không tiêu hao',
  },
  {
    id: '',
    name: 'All',
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState('');

  const { loading, products, error, productsCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const {
    loading: loadingResell,
    productResell,
    error: errorResell,
  } = useSelector((state) => state.productResell);

  const match = useParams();

  const handlePaginationChange = (e) => {
    setCurrentPage(e);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    if (errorResell) {
      return alert.error(errorResell);
    }
    dispatch(getProduct(match.keyword, currentPage, categories));

    dispatch(getProduct());
    dispatch(getProductResell());
  }, [dispatch, error, alert, match, currentPage, categories, errorResell]);

  return (
    <>
      {loading && loadingResell ? (
        <Loading />
      ) : (
        <Fragment>
          <Metadata title="Home Page - 2Hand" />
          <div className="banner">
            <p>
              Chào mừng tới <span>2Hand</span> E-Commerce
            </p>
            <h1>TÌM HIỂU SẢN PHẨM TUYỆT VỜI DƯỚI ĐÂY</h1>
            <a href="#container">
              <button className="banner_button_scroll">
                <span>Scroll now!</span>
                <i className="bx bx-mouse-alt"></i>
              </button>
            </a>
          </div>
          <section className="featured__product">
            <h2 className="featured__product__heading">Các sản phẩm</h2>
            <div className="featured__product__container">
              {products &&
                products.map(
                  (product, index) => !product.resell && <Product key={index} product={product} />
                )}
            </div>
            <div className="filter-categories">
              <Typography variant="h5" className="filter-categories-title">
                Category
              </Typography>
              <ul className="category-list">
                {categoriesData.map((category) => (
                  <li
                    className={`category-link ${categories === category.id ? 'active' : ''}`}
                    key={category.id}
                    onClick={() => setCategories(category.id)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pagination">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={handlePaginationChange}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          </section>
          <section name="container" className="featured__product" id="container">
            <h2 className="featured__product__heading">Sản phẩm bán lại</h2>
            <div className="featured__product__container">
              {productResell &&
                // eslint-disable-next-line array-callback-return
                productResell.map((product, index) => {
                  return <Product key={index} product={product} />;
                })}
            </div>
            {/* <div className="btn btn-add">
              <button>Xem thêm sản phẩm...</button>
            </div> */}
          </section>
        </Fragment>
      )}
    </>
  );
};

export default Home;
