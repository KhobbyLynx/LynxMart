import React from 'react';
import './Checkout.scss';
import { Link, NavLink, Outlet } from 'react-router-dom';
import CopyRight from '../../components/copyRight/CopyRight';

const Checkout = () => {
  const activeStyles = {
    fontWeight: 'bold',
    borderBottom: '2px solid #000'
  }
  return (
    <div className="checkout__container">
      <div className='checkout__info'>
        <h2 className='ch2'>LynxMart</h2>
        <h6 className='ch6'>Secure Checkout <span className='cs'>powered by Borderfree</span></h6>
        <div className='checkout__links'>
          <NavLink to='/cart'  className='link' >Cart</NavLink> &gt;
          <NavLink style={({ isActive }) => isActive ? activeStyles : null} to='.' end className='link'>Address</NavLink>
          <NavLink style={({ isActive }) => isActive ? activeStyles : null} to='delivery' className='link'>Delivery</NavLink>
          <NavLink style={({ isActive }) => isActive ? activeStyles : null} to='payment' className='link'>Payment</NavLink>
        </div>
        <div className="outlet">< Outlet /></div>
        <hr />
        <CopyRight />
      </div>
      <div className='checkout__order'>
        <h6 className='ch6'>Your Order</h6>
      </div>
    </div>
  )
};

export default Checkout;