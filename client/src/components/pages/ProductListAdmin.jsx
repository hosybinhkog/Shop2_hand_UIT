import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DELETE_PRODUCT_RESET } from '../../contants';
import { clearErrors, deleteProduct, getAdminProducts } from '../../redux/actions/productAction';
import Metadata from '../Metadata';
import SideBar from '../SideBar';

const ProductListAdmin = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const columns = [
    { field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5 },

    {
      field: 'name',
      headerName: 'Name',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
              <i class="bx bxs-edit"></i>
            </Link>

            <Button onClick={() => deleteProductHandler(params.getValue(params.id, 'id'))}>
              <i class="bx bx-message-alt-x"></i>
            </Button>
          </>
        );
      },
    },
  ];

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Delete deleted successfully');
      navigate('/admin/dashboard');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProducts());
  }, [error, dispatch, alert, deleteError, isDeleted, navigate]);

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      <Metadata title="AdminProduct - 2Hand" />
      <SideBar location={location} />
      <div className="product-list-admin">
        <div className="product-list-admin__title heading">All Products</div>
        <DataGrid
          sx={{ fontSize: '1.6rem' }}
          rows={rows}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default ProductListAdmin;
