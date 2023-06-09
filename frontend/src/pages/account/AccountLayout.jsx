import React from 'react'
import { images } from '../../constants';
import { Link, Outlet } from 'react-router-dom';
import CopyRight from '../../components/copyRight/CopyRight';
import './AccountLayout.scss'

const AccountLayout = () => {
  return (
    <div className='account'>
        <Link to='/' className='link'><img src={images.logo} alt='logo' /></Link>
        <h2>Welcome To LynxMart</h2>
       <Outlet className='account__form'/>
       <div className='account__footer'>
            <CopyRight />
       </div>
    </div>
  )
}

export default AccountLayout;