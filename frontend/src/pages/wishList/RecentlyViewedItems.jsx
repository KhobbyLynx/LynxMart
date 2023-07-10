import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GiClick } from 'react-icons/gi'
import './ItemsStyles.scss'
import FeaturedProducts from '../../components/featuredProducts/FeaturedProducts'

const RecentlyViewedItems = () => {
  const [products, setProducts] = useState(() =>
    JSON.parse(localStorage.getItem('recentlyViewed'))
  )

  useEffect(() => {
    const handleStorageChange = () => {
      setProducts(JSON.parse(localStorage.getItem('recentlyViewed')))
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
          <h6 className='no-product-found__title'>Recently Viewed Products</h6>
          <div className='no-product-found__icon-container df'>
            <GiClick className='no-product-found__icon' size={64} />
          </div>
          <div className='no-product-found__message dfacjc fdc'>
            <p className='head-text'>No Recently Viewed Products</p>
            <p>You have no recently viewed products at the moment.</p>
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

export default RecentlyViewedItems
