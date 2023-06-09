import React from 'react'
import './Delivery.scss'
import { Link } from 'react-router-dom'

const Delivery = () => {
    return (
        <>
            <div className='checkout__address tab__options'>
                <h3 className='ch3'>Delivery Method</h3>
                <div className="delivery">
                    <input type="radio" name="delivery" id="door" className='hide' />
                    <label htmlFor="door" className='tab__opt tab__p box__shadow df'>Door Delivery</label>
                </div>
                <div className="delivery">
                    <input type="radio" name="delivery" id="pickup" className='hide' />
                    <label htmlFor="pickup" className='tab__opt tab__p box__shadow df'>Pick up</label>
                </div>
            </div>
            <Link to='/cart/checkout/payment' className='link'><button className='checkout__btn'>Continue</button></Link>
        </>
    )
}

export default Delivery