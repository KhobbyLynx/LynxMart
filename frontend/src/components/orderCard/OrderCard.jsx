import React from 'react'
import './OrderCard.scss'

const OrderCard = ({ id, image, name, quantity, totalPrice }) => {
    return (
        <div>
            <div>
                <div>
                    <img src={image} style={{position: 'relative'}}/>
                    <span style={{position: 'absolute'}}>{quantity}</span>
                </div>
                <span>{name}</span>
                <h6>{price}</h6>
            </div>
            <div>
                <div>
                    <input type="text" id='discount' />
                    <label htmlFor="discount">Discount Code</label>
                </div>
                <button>Apply</button>
            </div>
            <div>
                <div>
                    <p>Subtotal</p>
                    <h6>${price}</h6>
                </div>
                <div>
                    <p>Shipping</p>
                    <h6>${price}</h6>
                </div>
                <div>
                    <h3>Total</h3>
                    <h6><span>USD</span>${price}</h6>
                </div>
            </div>
        </div>
    )
}

export default OrderCard