import React from "react";
import "./OrderCard.scss";
import { useSelector } from "react-redux";
const OrderCard = ({ id, image, name, price }) => {
  const quantity = useSelector((state) => {
    const item = state.cart.itemsList.find((item) => item.id === id);
    return item ? item.quantity : 0;
  });

  const subTotal = (price * quantity).toFixed(2);

  const shippingFee = 0;
  const calculateOverallTotal = () => {
    const grandTotal = parseFloat(subTotal);
    const overallTotal = grandTotal + shippingFee;
    return overallTotal.toFixed(2);
  };
  return (
    <div className="order__container">
      <div className="product__details">
        <div className="product__img">
          <img src={image} />
          <p>{quantity}</p>
        </div>
        <span>{name}</span>
        <h6>${price}</h6>
      </div>
      <div className="order__code">
        <input type="text" id="discount" placeholder="Enter discount code" />
        <button>Apply</button>
      </div>
      <div className="order__details">
        <div className="order__cost">
          <p>Subtotal</p>
          <span>${subTotal}</span>
        </div>
        <div className="order__cost">
          <p>Shipping</p>
          <span>$20</span>
        </div>
        <div className="order__total">
          <h3>Total</h3>
          <h6>
            <span>USD</span>${}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
