import {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Shop.scss'
import { shopBanner } from '../../data'
import ProductCard from '../../components/products/ProductCard'
import PageBanner from '../../components/pageBanner/PageBanner'
import newRequest from '../../utils/newRequest'

const Shop = () => {
    const [products, SetProducts] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await newRequest.get('/products');
          SetProducts(response.data)
        } catch (error) {
          console.log('Error fetching products', error)
        }
      }
      
      fetchData();
    }, [])
    
    const ProductsGridOne =  products.map( product => {
        return (
          <Link to={`/${product._id}`} key={product._id} className='product_link link'> 
            < ProductCard
              {...product}
            />
          </Link>
        )
    })

    const ProductsGridTwo = products.map( product => {
        return (
          <Link to={`/${product._id}`} key={product._id} className='product_link link'> 
          < ProductCard
            {...product}
          />
        </Link>
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