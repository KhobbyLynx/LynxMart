import React from 'react'
import './CheckoutForm.scss'
import { Link } from 'react-router-dom'

const CheckoutForm = () => {
  return (
    <div className='checkout__address'>
          <h3 className='ch3'>Address</h3>
          <form>
            <div className="country input__container">
              <label htmlFor="country">Country</label>
              <select name="country" id="country">
                <option value="nil">Select your Country</option>
                <option value="gh">Ghana</option>
                <option value="us">USA</option>
                <option value="ca">Canada</option>
                <option value="bel">Belgium</option>
              </select>
            </div>
            <div className="group__container__name">
              <div className='input__container'>
                <label htmlFor="firstname">First Name</label>
                <input type="text" id='firstname' name='firstName' placeholder='Enter your First Name' />
              </div>
              <div className='input__container'>
                <label htmlFor="lastname">Last Name</label>
                <input type="text" id='lastname' name='lastName' placeholder='Enter your Last Name' />
              </div>
            </div>
            <div className="group__container__phone">
              <div className="phone">
                <div className='input__container'>
                  <label htmlFor="prefix" className='prefix__label'>Prefix</label>
                  <div className='prefix__input'>+233</div>
                </div>
                <div className='input__container'>
                  <label htmlFor="phone">Phone Number</label>
                  <input type="text" id='phone' name='phone' placeholder='Enter your Phone Number' />
                </div>
              </div>
              <div className="phone">
                <div className='input__container'>
                  <label className='prefix__label' htmlFor="prefix">Prefix</label>
                  <div className='prefix__input'>+233</div>
                </div>
                <div className='input__container'>
                  <label htmlFor="phonetwo">Additional Phone Number</label>
                  <input type="text" id='phonetwo' name='phoneTwo' placeholder='Enter your Additional Phone Number' />
                </div>
              </div>
            </div>
            <div className="input__container">
              <label htmlFor="address">Address</label>
              <input type="text" id='address' name='address' placeholder='Enter your Address' />
            </div>
            <div className="address input__container">
              <label htmlFor="apartment">Additional Info</label>
              <input type="text" id='apartment' name='apartment' placeholder='Apartment, suite, etc. (optional)' />
            </div>
            <div className="group__container__name">
              <div className="region input__container">
                <label htmlFor="region">Region</label>
                <select name="region" id="region">
                  <option value="nil">Select</option>
                  <option value="AS">Ashati</option>
                  <option value="BA">Brong Ahafo</option>
                  <option value="CE">Central</option>
                  <option value="ES">Eastern</option>
                  <option value="GA">Greater Accra</option>
                  <option value="VO">Volta</option>
                </select>
              </div>
              <div className="city input__container">
                <label htmlFor="city">City</label>
                <select name="city" id="city">
                  <option value="nil">Select</option>
                  <option value="AS">Kasoa</option>
                  <option value="BA">WestHills</option>
                  <option value="CE">Lapaz</option>
                  <option value="ES">Ash Town</option>
                  <option value="GA">Teshie</option>
                  <option value="VO">Madina</option>
                </select>
              </div>
            </div>
            <Link to='delivery' className='link'><button className='checkout__btn'>Continue</button></Link>
          </form>
    </div>
  )
}

export default CheckoutForm