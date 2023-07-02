import React from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import './ProductDetails.scss'
import ProductCard from '../products/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../store/slices/cartSlice'
import { getProducts } from '../../utils/api'

export function loader() {
   return getProducts()
}

const ProductDetails = () => {
   const params = useParams()
   const products = useLoaderData()
   const product = products.find((product) => product._id === params.id)

   const dispatch = useDispatch()
   const addToCart = () => {
      dispatch(
         cartActions.addOrRemoveFromCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
         })
      )
   }
   const quantity = useSelector((state) => {
      const item = state.cart.itemsList.find((item) => item.id === params.id)
      return item ? item.quantity : 1
   })

   const handleQuantityChange = (e) => {
      const newQuantity = parseInt(e.target.value, 10)
      dispatch(
         cartActions.updateQuantity({ id: params.id, quantity: newQuantity })
      )
   }

   return (
      <>
         {product && (
            <div className='single__product'>
               <div className='product__detail'>
                  <div className='product__image'>
                     <img
                        src={product.images[0]}
                        width='100%'
                        id='MainImg'
                        alt=''
                     />
                     <div className='group__images'>
                        {product.images.map((image) => {
                           return (
                              <div key={image} className='group__col'>
                                 <img
                                    src={image}
                                    width='100%'
                                    className='small__img'
                                    alt=''
                                 />
                              </div>
                           )
                        })}
                     </div>
                  </div>
                  <div className='prodetails'>
                     <h6>
                        <Link to='/' className='link'>
                           Home
                        </Link>{' '}
                        <span>&gt;</span>{' '}
                        <Link to='/shop' className='link'>
                           Shop
                        </Link>{' '}
                        <span>&gt;</span> {product.category}
                     </h6>
                     <h4>{product.name}</h4>
                     <h2>${product.price}</h2>
                     <select>
                        <option>Select Size</option>
                        <option>XL</option>
                        <option>XXL</option>
                        <option>Small</option>
                        <option>Large</option>
                     </select>
                     <input
                        type='number'
                        min='1'
                        max='99'
                        value={quantity}
                        onChange={handleQuantityChange}
                     />
                     <button className='' onClick={addToCart}>
                        Add To Cart
                     </button>
                     <h4>Product Details</h4>
                     <span>{product.description}</span>
                  </div>
               </div>
               <section className='featured__products'>
                  <h2>Featured Products</h2>
                  <p>Summer Collection New Morden Design</p>
                  <div className='product-grid'>
                     {products.slice(0, 4).map((product) => {
                        return (
                           <div key={product._id}>
                              <Link
                                 to={`/${product._id}`}
                                 className='product_link link product-card'
                              >
                                 <ProductCard {...product} />
                              </Link>
                           </div>
                        )
                     })}
                  </div>
               </section>
            </div>
         )}
      </>
   )
}

export default ProductDetails
