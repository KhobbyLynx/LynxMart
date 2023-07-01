import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './ProductDetails.scss'
import ProductCard from '../products/ProductCard'
import newRequest from '../../utils/newRequest'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../store/slices/cartSlice'

const ProductDetails = () => {
   const [products, setProducts] = useState([])
   const [product, setProduct] = useState(null)
   const params = useParams()

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await newRequest.get(`/products/${params.id}`)
            setProduct(response.data)
         } catch (error) {
            console.log('Error fetching product', error)
         }
      }

      fetchData()
   }, [params.id])

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await newRequest.get('/products')
            setProducts(response.data)
         } catch (error) {
            console.log('Error fetching products', error)
         }
      }

      fetchData()
   }, [])

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

   const spinner = {
      height: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   }

   return (
      <>
         {product ? (
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
                  <div className='pro__container'>
                     {products.slice(0, 4).map((product) => {
                        return (
                           <div key={product._id}>
                              <Link
                                 to={`/${product._id}`}
                                 className='product_link link'
                                 onClick={window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth',
                                 })}
                              >
                                 <ProductCard {...product} />
                              </Link>
                           </div>
                        )
                     })}
                  </div>
               </section>
            </div>
         ) : (
            <div style={spinner}>
               <span className='loader'>Loading...</span>
            </div>
         )}
      </>
   )
}

export default ProductDetails
