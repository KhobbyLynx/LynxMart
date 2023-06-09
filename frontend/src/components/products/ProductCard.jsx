import React from 'react'
import { BsCart3, BsStarFill, BsStar, BsStarHalf} from 'react-icons/bs'
import './ProductCard.scss'
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/slices/cartSlice';

const ProductCard = ({ _id, name, brandName, price, rating, reviewCount, category, quantity, images}) => {

  const dispatch  = useDispatch();
  const addToCart = (e) => {
    e.preventDefault();
    console.log('Cart Clicked')
    dispatch(cartActions.addOrRemoveFromCart ({
      id: _id,
      name,
      price,
      image: images[0]
    }))
  }

  let badgeText;
  if (quantity === 0) {
    badgeText = 'Sold Out'
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<BsStarFill key={i} className='star__icon'/>);
  }
  if (hasHalfStar) {
    stars.push(<BsStarHalf key="half-star" className='star__icon'/>);
  }
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<BsStar key={i + fullStars + hasHalfStar} className='star__icon'/>);
  }

  return (
    <div className='product__container'>
        <div className="image__container">
          { badgeText && <h6 className="product__badge">
            {badgeText}
          </h6>}
          <img className="product__image" src={images[0]} alt={name} />
        </div>
        <div className="product__details">
          <span>{brandName}</span>
          <h5>{name}</h5>
          <div className="star">
            {stars} <h6>({reviewCount})</h6>
          </div>
          <h4>${price}</h4>
        </div>
        <div className="add__cart" onClick={addToCart}>< BsCart3 className='cart__icon'/></div>
    </div>
  )
}

export default ProductCard