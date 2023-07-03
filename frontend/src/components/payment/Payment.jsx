import React, { useState } from 'react'
import './Payment.scss'
import { Link, useOutletContext } from 'react-router-dom'
import { useSelector } from 'react-redux'
import newRequest from '../../utils/newRequest'

const Payment = () => {
  const overallTotal = useSelector((state) => state.cart.overallTotal)
  const [isPending, setIsPending] = useOutletContext()

  //overallTotal is in suppose to be cedis, *100 converts it to cedis.
  const totalPayment = overallTotal.toFixed(2) * 100

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsPending(true)
    setTimeout(() => {
      const request = async () => {
        try {
          const res = await newRequest.post('/paystack', {
            email: currentUser.email,
            amount: totalPayment,
          })

          const geturl = res.data.data.authorization_url
          if (geturl) {
            window.open(geturl, '_top')
          }
        } catch (error) {
          console.error(error)
        } finally {
          setTimeout(() => {
            setIsPending(false)
          }, 1000)
        }
      }
      return request()
    }, 2000)
  }

  const overallTotalFormatted = overallTotal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <>
      <div className='checkout__payment'>
        <h3 className='ch3'>Payment</h3>
        <span className='cs'>All transactions are secure and encrypted.</span>
        <h6>Proceed to pay</h6>
        <Link to='' className='link'>
          <button onClick={handleSubmit} className='checkout__btn'>
            Pay &nbsp; $ {overallTotalFormatted}
          </button>
        </Link>
      </div>
    </>
  )
}

export default Payment
