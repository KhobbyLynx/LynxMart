import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsFillArrowThroughHeartFill } from 'react-icons/bs'
import './ItemsStyles.scss'
import FeaturedProducts from '../../components/featuredProducts/FeaturedProducts'

const WishList = () => {
  const [products, setProducts] = useState(() =>
    JSON.parse(localStorage.getItem('wishlist'))
  )

  useEffect(() => {
    const handleStorageChange = () => {
      setProducts(JSON.parse(localStorage.getItem('wishlist')))
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])
  return (
    <>
      {products === null || products?.length === 0 ? (
        <div className='no-product-found dfacjc fdc'>
          <h6 className='no-product-found__title'>Saved Products</h6>
          <div className='no-product-found__icon-container df'>
            <BsFillArrowThroughHeartFill
              className='no-product-found__icon'
              size={64}
            />
          </div>
          <div className='no-product-found__message dfacjc fdc'>
            <p className='head-text'>No Saved Products</p>
            <p>You have no saved products at the moment.</p>
          </div>
          <Link to='/shop'>
            <button className='no-product-found__btn'>start shopping</button>
          </Link>
        </div>
      ) : (
        <FeaturedProducts
          header='Recently Viewed Products'
          desc='We saved these Products for you'
          products={products}
        />
      )}
    </>
  )
}

export default WishList
