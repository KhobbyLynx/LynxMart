import React, { useEffect, useState } from 'react'
import './Cart.scss'
import PageBanner from '../../components/pageBanner/PageBanner'
import { cartBanner } from '../../data'
import CartCard from '../../components/cartCard/CartCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FeaturedProducts from '../../components/featuredProducts/FeaturedProducts'

const Cart = () => {
  const [errorMsg, setErrorMsg] = useState('')
  // const cartItems = JSON.parse(localStorage.getItem('cartItems'))
  const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed'))

  const cartItems = useSelector((state) => state.cart.itemsList)
  const shippingFee = useSelector((state) => state.cart.shippingFee)
  const totalAmount = useSelector((state) => state.cart.totalAmount)

  const overallTotal = useSelector((state) => state.cart.overallTotal)

  const cartProducts = cartItems?.map((item) => {
    return <CartCard key={item.id} {...item} />
  })

  const formattedTotal = totalAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const overallTotalFormatted = overallTotal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  useEffect(() => {
    let timeId

    if (errorMsg) {
      timeId = setTimeout(() => {
        setErrorMsg('')
      }, 3000)
    }

    return () => {
      clearTimeout(timeId)
    }
  }, [errorMsg])

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const navigate = useNavigate()

  const handleCheckOut = (e) => {
    e.preventDefault()
    if (cartItems.length === 0) {
      setErrorMsg('No items In cart')
      return
    } else if (!currentUser) {
      localStorage.setItem('fromCart', true)
      navigate('/account/login')
    } else {
      navigate('/cart/checkout')
    }
  }

  return (
    <div className='cart__section'>
      <PageBanner {...cartBanner} />

      {cartItems === null || cartItems?.length === 0 ? (
        <section>
          <h2 className='no-cart-items'>No Items In Cart</h2>
        </section>
      ) : (
        <section className='cart'>
          <table width='100%'>
            <thead>
              <tr>
                <td>Remove</td>
                <td>Product</td>
                <td>Name</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Subtotal</td>
              </tr>
            </thead>
            <tbody>{cartProducts}</tbody>
          </table>
        </section>
      )}

      {recentlyViewed && (
        <FeaturedProducts
          header='Recently Viewed Items'
          desc='We saved this for you'
          products={recentlyViewed}
        />
      )}

      {cartItems === null || cartItems?.length === 0 ? null : (
        <section className='cart__add'>
          <div className='coupon'>
            <h3>Apply Coupon</h3>
            <div className='coupon__code'>
              <input type='text' placeholder='Enter Your Coupon' />
              <button>Apply</button>
            </div>
          </div>

          <div className='subtotal'>
            <h3>Cart Totals</h3>
            <div>
              <table>
                <thead>
                  <tr>
                    <td>Cart Subtotal</td>
                    <td>$ {formattedTotal}</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td>
                      {shippingFee === 0 ? <h3>Free</h3> : `$ ${shippingFee}`}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>
                      <strong>$ {overallTotalFormatted}</strong>
                    </td>
                  </tr>
                </thead>
              </table>
              {errorMsg && <span className='error-msg'>{errorMsg}</span>}
            </div>
            <button onClick={handleCheckOut}>Proceed to checkout</button>
          </div>
        </section>
      )}
    </div>
  )
}

export default Cart
