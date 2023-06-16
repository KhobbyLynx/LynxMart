import React, { useState } from "react";
import "./Payment.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import newRequest from "../../utils/newRequest";

const Payment = () => {
  const overallTotal = useSelector((state) => state.cart.overallTotal);

  //overallTotal is in cedis, *100 converts it to pesewas.
  const totalPayment = overallTotal.toFixed(2) * 100;
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await newRequest.post("/paystack", {
        email: formData.email,
        amount: totalPayment,
      });

      const geturl = res.data.data.authorization_url;
      if (geturl) {
        // Open the URL in a popup window
        window.open(geturl, "_blank", "width=500,height=600");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const overallTotalFormatted = overallTotal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="checkout__payment">
      <h3 className="ch3">Payment</h3>
      <span className="cs">All transactions are secure and encrypted.</span>
      <h6>choose a payment method</h6>
      <div className="input__container">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          placeholder="Enter your Email"
          onChange={handleInputChange}
          required
        />
      </div>
      <Link to="" className="link">
        <button onClick={handleSubmit} className="checkout__btn">
          Pay &nbsp; $ {overallTotalFormatted}
        </button>
      </Link>
    </div>
  );
};

export default Payment;
