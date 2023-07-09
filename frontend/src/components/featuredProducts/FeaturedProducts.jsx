import React from 'react'
import './FeaturedProducts.scss'
import ProductCard from '../products/ProductCard'
import { Link } from 'react-router-dom'

const FeaturedProducts = ({ header, desc, products, setSelectedImage }) => {
  return (
    <section className='featured__products'>
      <h2>{header}</h2>
      <p>{desc}</p>
      <div className='product-grid'>
        {products.slice(0, 4).map((product) => {
          return (
            <div key={product._id}>
              <Link
                to={`/${product._id}`}
                className='product_link link product-card'
              >
                <ProductCard {...product} setSelectedImage={setSelectedImage} />
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FeaturedProducts
