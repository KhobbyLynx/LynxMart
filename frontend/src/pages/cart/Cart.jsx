import React from "react";
import "./Cart.scss";
import PageBanner from "../../components/pageBanner/PageBanner";
import { cartBanner } from "../../data";
import CartCard from "../../components/cartCard/CartCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.itemsList);
  const shippingFee = useSelector((state) => state.cart.shippingFee);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const overallTotal = useSelector((state) => state.cart.overallTotal);
  const cartProducts = cartItems.map((item) => {
    return <CartCard key={item.id} {...item} />;
  });

  const formattedTotal = totalAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const overallTotalFormatted = overallTotal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="cart__section">
      <PageBanner {...cartBanner} />

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
          <tbody>{cartProducts}</tbody>
        </table>
      </section>

      <section className="cart__add">
        <div className="coupon">
          <h3>Apply Coupon</h3>
          <div className="coupon__code">
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
          <Link to="checkout" className="link">
            <button>Proceed to checkout</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Cart;
