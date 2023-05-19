import React from 'react'
import './Cart.scss'
import PageBanner from '../../components/pageBanner/PageBanner'
import { cartBanner, cartItems } from '../../data'
import CartCard from '../../components/cartCard/CartCard'

const Cart = () => {

    const cartProducts = cartItems.map(item => {
        return(
            < CartCard key={item.id} {...item} />
        )
    })
    return (
        <div className='cart__section'>
            < PageBanner {...cartBanner} />

            <section className="cart">
                <table width="100%">
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
                    <tbody>
                        { cartProducts }
                    </tbody>
                </table >
            </section >

            <section className="cart__add">
                <div className="coupon">
                    <h3>Apply Coupon</h3>
                    <div className='coupon__code'>
                        <input type="text" placeholder="Enter Your Coupon" />
                        <button>Apply</button>
                    </div>
                </div>

                <div className="subtotal">
                    <h3>Cart Totals</h3>
                    <table>
                        <thead>
                            <tr>
                                <td>Cart Subtotal</td>
                                <td>$ 335</td>
                            </tr>
                            <tr>
                                <td>Shipping</td>
                                <td>Free</td>
                            </tr>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td><strong>$ 335</strong></td>
                            </tr>
                        </thead>
                    </table>
                    <button>Proceed to checkout</button>
                </div>
            </section>
        </div >
    )
}

export default Cart