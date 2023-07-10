import React from 'react'
import { FaLuggageCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Orders.scss'

const Orders = () => {
  return (
    <>
      <div className='no-product-found dfacjc fdc'>
        <h6 className='no-product-found__title'>Orders</h6>
        <div className='no-product-found__icon-container df'>
          <FaLuggageCart className='no-product-found__icon' size={64} />
        </div>
        <div className='no-product-found__message dfacjc fdc'>
          <p className='head-text'>You have placed no orders yet!</p>
          <p>
            All your orders will be saved here for you to access their state
            anytime.
          </p>
        </div>
        <Link to='/shop'>
          <button className='no-product-found__btn'>continue shopping</button>
        </Link>
      </div>
    </>
  )
}

export default Orders
