import React from 'react'
import './OrderCard.scss'
import images from '../../constants/images'
const OrderCard = () => {
    return (
        <div className='order__container'>
            <div className='product__details'>
                <div className='product__img'>
                    <img src={images.cat5}/>
                    <p>10</p>
                </div>
                <span>Apple Smart watch - Casual wear</span>
                <h6>$200</h6>
            </div>
            <div className='order__code'>
                <input type="text" id='discount' placeholder='Enter discount code' />
                <button>Apply</button>
            </div>
            <div className='order__details'>
                <div className='order__cost'>
                    <p>Subtotal</p>
                    <span>$200</span>
                </div>
                <div className='order__cost'>
                    <p>Shipping</p>
                    <span>$20</span>
                </div>
                <div className='order__total'>
                    <h3>Total</h3>
                    <h6><span>USD</span>$220</h6>
                </div>
            </div>
        </div>
    )
}

export default OrderCard