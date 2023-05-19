import React from 'react'
import './Brands.scss'
import { brands } from '../../data'

const Brands = () => {
  return (
    <div className='brands__container'>
        <div className="brands">
            <div className="brands__header">
                <h4>Exclusive Brand Partners</h4>
            </div>
            <div className="brand__logos">
                <div className="logos__container">
                    { brands.map(brand => (
                        <img key={brand.id} src={brand.brandImg} alt="brands" />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Brands