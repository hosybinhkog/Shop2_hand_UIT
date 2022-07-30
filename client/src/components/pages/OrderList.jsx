import React from 'react';
import Metadata from '../Metadata';
import SideBar from '../SideBar';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const OrderList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  return (
    <>
      <Metadata title="Order List" />
      <SideBar location={location} />
    </>
  );
};

export default OrderList;
