import { useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import './CartCard.scss'

const CartCard = ({ productImg, productName, price, subTotal }) => {
  const [quantity, setQuantity] = useState(1)

  function handleChange(e) {
    setQuantity(e.target.value)
  }

  return (
        <tr>
            <td>
                <FaRegTimesCircle className='remove__icon' />
            </td>
            <td>
                <img src={productImg} alt={productName} />
            </td>
            <td>{productName}</td>
            <td>${price}</td>
            <td>
                <input type="number" value={quantity} min="1" onChange={handleChange} />
            </td>
            <td>${subTotal}</td>
        </tr>
  )
}

export default CartCard
