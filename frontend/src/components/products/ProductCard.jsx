import React from 'react'
import { BsCart3, BsStarFill, BsStar, BsStarHalf} from 'react-icons/bs'
import './ProductCard.scss'

const ProductCard = ({ productImg, productName, brandName, stats, price, stock}) => {
  let badgeText;
  if (stock === 0) {
    badgeText = 'Sold Out'
  }

  let rating = stats.ratings
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
          <img className="product__image" src={productImg} alt={productName} />
        </div>
        <div className="product__details">
          <span>{brandName}</span>
          <h5>{productName}</h5>
          <div className="star">
            {stars} <h6>({stats.reviewCount})</h6>
          </div>
          <h4>${price}</h4>
        </div>
        <div className="add__cart">< BsCart3 className='cart__icon'/></div>
    </div>
  )
}

export default ProductCard