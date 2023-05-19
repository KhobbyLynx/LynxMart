import React from 'react'
import './Shop.scss'
import { productsGridOne, productsGridTwo, shopBanner } from '../../data'
import ProductCard from '../../components/products/ProductCard'
import PageBanner from '../../components/pageBanner/PageBanner'

const Shop = () => {

    const ProductsGridOne = productsGridOne.map( product => {
        return (
          < ProductCard
            key={product.id}
            {...product}   
          />
        )
    })

    const ProductsGridTwo = productsGridTwo.map( product => {
        return (
            < ProductCard
            key={product.id}
            {...product}   
            />
        )
    })
  return (
    <div>
        < PageBanner {...shopBanner} />
        <div className="shop__products">
            <div className="products__grid">{ ProductsGridOne }</div>
            <div className="products__grid">{ ProductsGridTwo }</div>
        </div>
    </div>
  )
}

export default Shop