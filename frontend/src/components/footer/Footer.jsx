import React from 'react'
import { SiFacebook, SiTwitter, SiInstagram, SiTiktok } from 'react-icons/si'
import './Footer.scss'
import { images } from '../../constants'
import { Link } from 'react-router-dom'
import CopyRight from '../copyRight/CopyRight'

const Footer = () => {
   return (
      <div className='footer'>
         <div className='footer__logo'>
            <img src={images.logo} alt='lynx logo' />
         </div>
         <div className='footer__content'>
            <div className='footer__contact'>
               <div className='contact__section'>
                  <h2>Contact</h2>
                  <div className='contact__info'>
                     <span className='span'>
                        Address: 562 Wellington Street 32, San Francisco
                     </span>
                     <span className='span'>
                        Phone: +01 2222 365 / (+91) 012345 6789
                     </span>
                     <span className='span'>
                        Hours: 10:00 - 18:00, Mon - Sat
                     </span>
                  </div>
               </div>
               <div className='socials__section'>
                  <h2>Join Us On</h2>
                  <div className='social__icons'>
                     <SiFacebook className='icon' />
                     <SiTwitter className='icon' />
                     <SiInstagram className='icon' />
                     <SiTiktok className='icon' />
                  </div>
               </div>
            </div>
            <div className='footer__links'>
               <div className='footer__about'>
                  <h2>About</h2>
                  {[
                     'About Us',
                     'Devlivery Information',
                     'Privacy Policy',
                     'Terms & Conditions',
                     'Contact Us',
                  ].map((link) => (
                     <Link className='link span' key={link}>
                        {link}
                     </Link>
                  ))}
               </div>
               <div className='footer__account'>
                  <h2>My Account</h2>
                  {[
                     'Sign In',
                     'View Cart',
                     'My Wishlist',
                     'Track My Order',
                     'Help',
                  ].map((link) => (
                     <Link className='link span' key={link}>
                        {link}
                     </Link>
                  ))}
               </div>
            </div>
            <div className='footer__others'>
               <h2>Install App</h2>
               <div className='mobile__app'>
                  <h6>From App Store or Google Play</h6>
                  <div className='app__store'>
                     <img src={images.app} alt='App Store' />
                     <img src={images.play} alt='Google Play' />
                  </div>
               </div>
               <div className='payment__gateways'>
                  <h6>Secured Payment Gateways</h6>
                  <img src={images.pay} alt='payment gateways' />
               </div>
            </div>
         </div>
         <CopyRight />
      </div>
   )
}

export default Footer
