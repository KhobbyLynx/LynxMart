import React from 'react'
import './Inbox.scss'
import { BsEnvelopeSlash } from 'react-icons/bs'

const Inbox = () => {
  return (
    <>
      <div className='no-product-found dfacjc fdc'>
        <h6 className='no-product-found__title'>Inbox Messages</h6>
        <div className='no-product-found__icon-container df'>
          <BsEnvelopeSlash className='no-product-found__icon' size={64} />
        </div>
        <div className='no-product-found__message dfacjc fdc'>
          <p className='head-text'>You don't have any messages</p>
          <p>
            Here you will be able to see all the messages that we send you. Stay
            tuned
          </p>
        </div>
      </div>
    </>
  )
}

export default Inbox
