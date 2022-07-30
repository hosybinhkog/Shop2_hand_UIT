import React from 'react';
import { Link } from 'react-router-dom';

const sideBarData = [
  {
    display_name: 'Dashboard',
    route: '/admin/dashboard',
    icon: 'bx bx-category-alt',
  },
  {
    display_name: 'Customers',
    route: '/admin/customers',
    icon: 'bx bx-user-pin',
  },
  {
    display_name: 'Products',
    route: '/admin/product',
    icon: 'bx bx-package',
  },
  {
    display_name: 'Create product',
    route: '/admin/product/new',
    icon: 'bx bx-package',
  },
  {
    display_name: 'Order list',
    route: '/admin/orderlist',
    icon: 'bx bx-category-alt',
  },
];

const SideBar = (props) => {
  const activeItem = sideBarData.findIndex((item) => item.route === props.location.pathname);
  return (
    <div className="sidebar">
      {/* <div className="sidebar__logo">
        <img src={logo} alt="Logo" />
      </div> */}
      {sideBarData.map((item, index) => {
        return (
          <Link to={item.route} key={index}>
            <SidebarItem title={item.display_name} icon={item.icon} active={index === activeItem} />
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;

const SidebarItem = (props) => {
  const active = props.active ? 'active' : '';

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};
