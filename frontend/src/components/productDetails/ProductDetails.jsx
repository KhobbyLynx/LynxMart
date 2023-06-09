import React, { useState } from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import './ProductDetails.scss'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { cartActions } from '../../store/slices/cartSlice'
import { getProducts } from '../../utils/api'
import FeaturedProducts from '../featuredProducts/FeaturedProducts'

export function loader() {
  return getProducts()
}

const ProductDetails = () => {
  const params = useParams()
  const products = useLoaderData()
  const product = products.find((product) => product._id === params.id)
  const [selectedImage, setSelectedImage] = useState(product.images[0])
  const cartItems = useSelector((state) => state.cart.itemsList)
  const existingItem = cartItems.find((item) => item.id === params.id)

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const dispatch = useDispatch()

  const updateCartItems = () => {
    dispatch(
      cartActions.updateCartItems({
        id: product._id,
        name: product.name,
        price: product.price,
        image: selectedImage,
      })
    )

    const toastType = existingItem ? 'error' : 'success'
    const msg = existingItem ? 'Item removed from cart' : 'Item added to cart'

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

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10)
    dispatch(
      cartActions.updateQuantity({ id: params.id, quantity: newQuantity })
    )
  }

  const quantity = useSelector((state) => {
    const item = state.cart.itemsList.find((item) => item.id === params.id)
    return item ? item.quantity : 1
  })

  let shortenedName = product.name
  const maxLength = 20

  if (shortenedName.length > maxLength) {
    shortenedName = shortenedName.substring(0, maxLength - 3) + '...'
  }

  const formattedPrice = product.price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <>
      {product && (
        <div className='single__product'>
          <div className='product__detail'>
            <div className='product__image'>
              <img src={selectedImage} width='100%' alt='' />
              <div className='group__images'>
                {product.images.map((image) => {
                  return (
                    <div
                      key={image}
                      className='group__col'
                      onClick={() => handleImageClick(image)}
                    >
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
                <span>&gt;</span>{' '}
                <Link to={`/shop?cat=${product.category}`} className='link'>
                  {product.category}
                </Link>{' '}
                <span>&gt;</span>{' '}
                <span className='pro-name'>{shortenedName}</span>
              </h6>
              <h4>{product.name}</h4>
              <h2>
                GH&#8373;
                {formattedPrice}
              </h2>
              {product.category.toLowerCase() === 'clothing' && (
                <select>
                  <option>Select Size</option>
                  <option>XL</option>
                  <option>XXL</option>
                  <option>Small</option>
                  <option>Large</option>
                </select>
              )}
              {existingItem && (
                <input
                  type='number'
                  min='1'
                  max='99'
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              )}
              <button className='' onClick={updateCartItems}>
                Add To Cart
              </button>
              <h4>Product Details</h4>
              <span>{product.description}</span>
            </div>
          </div>
          <FeaturedProducts
            header='Featured Products'
            desc='Summer Collection New Morden Design'
            products={products}
            setSelectedImage={setSelectedImage}
          />
        </div>
      )}
    </>
  )
}

export default ProductDetails
