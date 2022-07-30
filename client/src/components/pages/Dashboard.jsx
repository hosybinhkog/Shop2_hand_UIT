import React from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from '../SideBar';
import StatusCard from '../StatusCard';
import { Doughnut, Line } from 'react-chartjs-2';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const location = useLocation();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  const statusData = [
    {
      icon: 'bx bx-shopping-bag',
      count: products.length,
      title: 'Total product',
    },
    {
      icon: 'bx bx-cart',
      count: '2,001',
      title: 'Daily visits',
    },
    {
      icon: 'bx bx-dollar-circle',
      count: '$2,632',
      title: 'Total income',
    },
    {
      icon: 'bx bx-receipt',
      count: '1,711',
      title: 'Total orders',
    },
  ];

  // let totalAmount = 0;
  // orders &&
  //   orders.forEach((item) => {
  //     totalAmount += item.totalPrice;
  //   });

  // const lineState = {
  //   labels: ['Initial Amount', 'Amount Earned'],
  //   datasets: [
  //     {
  //       label: 'TOTAL AMOUNT',
  //       backgroundColor: ['tomato'],
  //       hoverBackgroundColor: ['rgb(197, 72, 49)'],
  //       data: [0, totalAmount],
  //     },
  //   ],
  // };

  // const doughnutState = {
  //   labels: ['Out of Stock', 'InStock'],
  //   datasets: [
  //     {
  //       backgroundColor: ['#00A6B4', '#6800B4'],
  //       hoverBackgroundColor: ['#4B5000', '#35014F'],
  //       data: [outOfStock, products.length - outOfStock],
  //     },
  //   ],
  // };
  return (
    <>
      <div className="dashboard">
        <SideBar location={location} />
        <div className="dashboard__statusCard">
          {statusData.map((item, index) => (
            <StatusCard key={index} icon={item.icon} count={item.count} title={item.title} />
          ))}
        </div>

        {/* <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
