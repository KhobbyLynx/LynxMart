import React from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import './CartCard.scss'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../store/slices/cartSlice'

const CartCard = ({ id, image, name, price }) => {
  const dispatch = useDispatch()
  const removeHandler = () => {
    dispatch(cartActions.removeFromCart(id))
  }

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10)
    dispatch(cartActions.updateQuantity({ id, quantity: newQuantity }))
  }

  const quantity = useSelector((state) => {
    const item = state.cart.itemsList.find((item) => item.id === id)
    return item ? item.quantity : 0
  })

  const subTotalFormatted = (quantity * price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <>
      <tr>
        <td>
          <FaRegTimesCircle className='remove__icon' onClick={removeHandler} />
        </td>
        <td>
          <img src={image} alt={name} />
        </td>
        <td>{name}</td>
        <td>${price}</td>
        <td>
          <input
            type='number'
            value={quantity}
            min='1'
            max='99'
            onChange={handleQuantityChange}
          />
        </td>
        <td>${subTotalFormatted}</td>
      </tr>
    </>
  )
}

export default CartCard
