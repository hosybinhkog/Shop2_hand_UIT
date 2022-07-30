import React from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../commom/Loading';
import Metadata from '../Metadata';
import { clearErrors, myOrders, updateStatus } from '../../redux/actions/orderActions';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const OrderMe = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { success, error: errorUpdate } = useSelector((state) => state.updateOrderStatus);

  const handleUpdateStatus = (id) => {
    dispatch(updateStatus(id));
  };

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered' ? 'greenColor' : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 290,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.getValue(params.id, 'id')}`}>
              <i class="bx bx-laugh"></i>
            </Link>
            <span
              onClick={() => handleUpdateStatus(params.getValue(params.id, 'id'))}
              sx={{ cursor: 'pointer' }}
            >
              {' '}
              Update status{' '}
            </span>
          </>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (errorUpdate) {
      alert.error(errorUpdate);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success('Cập nhật thông tin đơn hàng thành công');
    }
    dispatch(myOrders());
  }, [error, alert, dispatch, success, errorUpdate]);

  return (
    <>
      <Metadata title="Order - 2Hand" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="myOrdersPage" sx={{ fontSize: '1.6rem' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />

            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          </div>
        </>
      )}
    </>
  );
};

export default OrderMe;
