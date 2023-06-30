import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import newRequest from '../../utils/newRequest'
import Hero from '../hero/Hero'
import './Home.scss'
import Category from '../../components/category/Category'
import BookSlider from '../../components/bookSlider/BookSlider'
import ProductCard from '../../components/products/ProductCard'
import Brands from '../../components/brands/Brands'

const Home = () => {
   const [products, setProducts] = useState([])

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await newRequest.get('/products')
            setProducts(response.data)
         } catch (error) {
            console.error('Error fetching products:', error)
         }
      }

      fetchData()
   }, [])

   const productsSetOne = products.slice(0, 8)
   const productsSetTwo = products.slice(8, 16)

   const ProductsGridOne = productsSetOne.map((product) => {
      return (
         <div key={product._id}>
            <Link to={`/${product._id}`} className='product_link link'>
               <ProductCard {...product} />
            </Link>
         </div>
      )
   })

   const ProductsGridTwo = productsSetTwo.map((product) => {
      return (
         <div key={product._id}>
            <Link to={`/${product._id}`} className='product_link link'>
               <ProductCard {...product} />
            </Link>
         </div>
      )
   })

   return (
      <div className='home'>
         <Hero />
         <Category />
         <BookSlider />
         <section className='products__section'>
            <div className='products__heading'>
               <h1>Latest Trends and Styles | Fashion</h1>
               <p>Summer Collections - New Modern Design</p>
            </div>
            <div className='products__grid'>{ProductsGridOne}</div>
         </section>
         <section className='banner__explore'>
            <h4>Evolution Of Fashion</h4>
            <p>
               Up to <span>70% off</span> ‒ All t-Shirts & Accessories
            </p>
            <button>Explore More</button>
         </section>
         <section className='products__section'>
            <div className='products__heading'>
               <h1>Best Sellers | Collections</h1>
               <p>There’s Something Here for Everyone - No Matter Your Style</p>
            </div>
            <div className='products__grid'>{ProductsGridTwo}</div>
         </section>
         <Brands />
         <section className='big__banner'>
            <div className='banner__box'>
               <h4>crazy deals</h4>
               <h2>buy 1 get 1 free</h2>
               <span>The best classic dress is on sale at LynxMart</span>
               <button className='white'>Learn More</button>
            </div>
            <div className='banner__box'>
               <h4>spring/summer</h4>
               <h2>upcoming season</h2>
               <span>The best classic Rollex is on sale at LynxMart</span>
               <button className='white'>Collections</button>
            </div>
         </section>

         <section className='small__banner'>
            <div className='banner__box'>
               <h2>SEASONAL SALE</h2>
               <h3>Winter Collection -50% OFF</h3>
            </div>
            <div className='banner__box'>
               <h2>NEW FOOTWEAR COLLECTION</h2>
               <h3>Spring/Summer 2023</h3>
            </div>
            <div className='banner__box'>
               <h2>Tech</h2>
               <h3>New Tech Releases</h3>
            </div>
         </section>
      </div>
   )
}

export default Home
