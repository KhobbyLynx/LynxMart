import React from 'react'
import { Link } from 'react-router-dom'
import './WishList.scss'
import ProductCard from '../../components/products/ProductCard'
import { featuredProducts, productsGridOne } from '../../data'

const WishList = () => {
    const wishProducts = productsGridOne.map(pro => {
        return(
            <ProductCard key={pro.id} {...pro} />
        )
    })
  return (
    <div className='wish__list'>
        <p> <Link to='/' className='link'>Home</Link> &gt; Wish List </p>
        <div className="wishlist__products df">
            {wishProducts}
        </div>
    </div>
  )
}

export default WishList