import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import CopyRight from '../../components/copyRight/CopyRight'
import { useSelector } from 'react-redux'
import './Checkout.scss'
import { images } from '../../constants'
import HashLoader from 'react-spinners/HashLoader'

const Checkout = () => {
  const [isPending, setIsPending] = useState(true)
  const cartItems = useSelector((state) => state.cart.itemsList)
  const shippingFee = useSelector((state) => state.cart.shippingFee)
  const totalAmount = useSelector((state) => state.cart.totalAmount)
  const overallTotal = useSelector((state) => state.cart.overallTotal)

  const orderedItems = cartItems.map((item) => {
    const { id, name, image, price } = item
    const quantity = useSelector((state) => {
      const item = state.cart.itemsList.find((item) => item.id === id)
      return item ? item.quantity : 0
    })
    const subTotal = (price * quantity).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    return (
      <div key={id} className='product__details'>
        <div className='product__img'>
          <img src={image} alt='Product Image' />
          <p>{quantity}</p>
        </div>
        <span>{name}</span>
        <h6>${subTotal}</h6>
      </div>
    )
  })

  const ShippingFeeFormatted = shippingFee.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const totalAmountFormatted = totalAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const overallTotalFormatted = overallTotal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const activeStyles = {
    fontWeight: '700',
    border: '2px solid #06D0B8',
    color: '#000',
    backgroundColor: '#C2C2C2',
  }

  const handleClick = (e) => {
    e.preventDefault()
  }
  return (
    <>
      {isPending && (
        <>
          <div className='request-loader main-layout__loader'>
            <HashLoader color='#D65E05' loading size={60} />
          </div>
          <div className='overlay'></div>
        </>
      )}
      <div className='checkout__cover'>
        <div className='checkout__head'>
          <Link to='/' className='link'>
            <img src={images.logo} alt='' className='logo' />
          </Link>
          <h2 className='ch2'>LynxMart</h2>
          <h6 className='ch6'>
            Secure Checkout <span className='cs'>powered by PayStack</span>
          </h6>
        </div>
        <div className='checkout__container'>
          <div className='checkout__info'>
            <div className='checkout__links'>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyles : null)}
                to='.'
                end
                className='checkout__link'
                onClick={handleClick}
              >
                Address
              </NavLink>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyles : null)}
                to='delivery'
                className='checkout__link'
                onClick={handleClick}
              >
                Delivery
              </NavLink>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyles : null)}
                to='payment'
                className='checkout__link'
                onClick={handleClick}
              >
                Payment
              </NavLink>
            </div>
            <div className='outlet'>
              <Outlet context={[isPending, setIsPending]} />
            </div>
            <hr />
            <CopyRight />
          </div>
          <div className='checkout__order'>
            <h6>Your Order</h6>
            <div className='order__container'>
              {orderedItems}
              <div className='order__code'>
                <input
                  type='text'
                  id='discount'
                  placeholder='Enter discount code'
                />
                <button>Apply</button>
              </div>
              <div className='order__details'>
                <div className='order__cost'>
                  <p>Subtotal</p>
                  <span>${totalAmountFormatted}</span>
                </div>
                <div className='order__cost'>
                  <p>Shipping</p>
                  <span>${ShippingFeeFormatted}</span>
                </div>
                <div className='order__total'>
                  <h3>Total</h3>
                  <h6 className='df'>
                    <span>USD</span>${overallTotalFormatted}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
