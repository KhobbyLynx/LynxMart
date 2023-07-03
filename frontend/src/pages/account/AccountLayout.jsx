import React, { useState } from 'react'
import { images } from '../../constants'
import { Link, Outlet } from 'react-router-dom'
import CopyRight from '../../components/copyRight/CopyRight'
import './AccountLayout.scss'
import HashLoader from 'react-spinners/HashLoader'

const AccountLayout = () => {
  const [isPending, setIsPending] = useState(false)
  return (
    <div className='account'>
      <Link to='/' className='link'>
        <img src={images.logo} alt='logo' />
      </Link>
      <h2>Welcome To LynxMart</h2>
      <div className='account__form'>
        <Outlet context={[isPending, setIsPending]} />
      </div>
      <div className='account__footer'>
        <CopyRight />
      </div>
      {isPending && (
        <>
          <div className='request-loader'>
            <HashLoader color='#D65E05' loading size={60} />
          </div>
          <div className='overlay'></div>
        </>
      )}
    </div>
  )
}

export default AccountLayout
