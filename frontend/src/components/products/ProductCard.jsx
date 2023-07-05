import React from 'react'
import {
  BsCart3,
  BsStarFill,
  BsStar,
  BsStarHalf,
  BsCartCheck,
} from 'react-icons/bs'
import './ProductCard.scss'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../store/slices/cartSlice'
import { toast } from 'react-toastify'

const ProductCard = ({
  _id,
  name,
  brandName,
  price,
  rating,
  reviewCount,
  quantity,
  images,
  setSelectedImage,
}) => {
  const dispatch = useDispatch()
  const inCart = useSelector((state) =>
    state.cart.itemsList.some((item) => item.id === _id)
  )

  const handleClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, 800)

    let recentlyViewed =
      JSON.parse(localStorage.getItem('recentlyViewed')) || []
    const productExists = recentlyViewed.some((product) => product.id === _id)

    if (!productExists) {
      recentlyViewed.push({
        id: _id,
        name,
        brandName,
        price,
        rating,
        reviewCount,
        images,
      })

      if (recentlyViewed.length > 8) {
        recentlyViewed.shift() // Remove the oldest product (first element)
      }

      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed))
    }

    setSelectedImage(images[0])
  }

  const handleCartClick = (e) => {
    e.preventDefault()

    dispatch(
      cartActions.updateCartItems({
        id: _id,
        name,
        price,
        image: images[0],
      })
    )

    const toastType = inCart ? 'error' : 'success'
    const msg = inCart ? 'Item removed from cart' : 'Item added to cart'

    toast[toastType](msg, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'light',
    })
  }

  let badgeText
  if (quantity === 0) {
    badgeText = 'Sold Out'
  }

  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  const stars = []
  for (let i = 0; i < fullStars; i++) {
    stars.push(<BsStarFill key={i} className='star__icon' />)
  }
  if (hasHalfStar) {
    stars.push(<BsStarHalf key='half-star' className='star__icon' />)
  }
  const emptyStars = 5 - stars.length
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <BsStar key={i + fullStars + hasHalfStar} className='star__icon' />
    )
  }

  return (
    <>
      <div className='product__container'>
        <div onClick={handleClick}>
          <div className='image__container'>
            {badgeText && <h6 className='product__badge'>{badgeText}</h6>}
            <img className='product__image' src={images[0]} alt={name} />
          </div>
          <div className='product__details'>
            <span>{brandName}</span>
            <h5>{name}</h5>
            <div className='star'>
              {stars} <h6>({reviewCount})</h6>
            </div>
            <h4>${price}</h4>
          </div>
        </div>
        <div
          className={`cartIcon ${inCart && 'addedCartIcon'}`}
          onClick={handleCartClick}
        >
          {!inCart ? (
            <BsCart3 className='cart__icon' />
          ) : (
            <BsCartCheck className='cart__icon' />
          )}
        </div>
      </div>
    </>
  )
}

export default ProductCard
