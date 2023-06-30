import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './Shop.scss'
import ProductCard from '../../components/products/ProductCard'
import newRequest from '../../utils/newRequest'

const Shop = () => {
   const [products, SetProducts] = useState([])
   const [searchParams, setSearchParams] = useSearchParams()
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await newRequest.get('/products')
            SetProducts(response.data)
         } catch (error) {
            console.log('Error fetching products', error)
         }
      }

      fetchData()
   }, [])

   const searchFilter = searchParams.get('q')
   const catFilter = searchParams.get('cat')

   const filteredProducts = searchFilter
      ? products.filter((item) =>
           item.name.toLowerCase().includes(searchFilter.toLowerCase())
        )
      : catFilter
      ? products.filter((item) =>
           item.category.toLowerCase().includes(catFilter.toLowerCase())
        )
      : products

   const ProductsGridOne = filteredProducts.map((product) => {
      return (
         <div key={product._id}>
            <Link to={`/${product._id}`} className='product_link link'>
               <ProductCard {...product} />
            </Link>
         </div>
      )
   })

   const handleClearSearch = () => {
      searchParams.delete('q')
      setSearchParams(searchParams)
      setSearchValue('')
   }

   return (
      <>
         {filteredProducts.length === 0 ? (
            <div>
               <h1>No products found</h1>
            </div>
         ) : (
            <>
               <section className='shop__layout'>
                  <aside className='aside__section'>
                     <div className='shop__cat'>
                        <h3>CATEGORY</h3>
                        <span>Computing</span>
                        <span>Electronics</span>
                        <span>Phones & Tablets</span>
                        <span>Automobile</span>
                     </div>
                     <div className='shop__cat_price'>
                        <div className='price__head'>
                           <h3>PRICE&nbsp;(GH₵)</h3>
                           <button>Apply</button>
                        </div>
                        <div className='price__input'>
                           <input name='x' type='number' placeholder='min' />
                           -
                           <input name='y' type='number' placeholder='max' />
                        </div>
                     </div>
                     <div className='cat__brand'>
                        <h3>Brand</h3>
                        <span>Apple</span>
                        <span>Levi</span>
                        <span>Adidas</span>
                        <span>Lynx</span>
                     </div>
                  </aside>
                  <main className='shop__products'>
                     <h6>
                        <Link to='/' className='link'>
                           Home
                        </Link>{' '}
                        <span>&gt;</span>{' '}
                        {searchFilter ? (
                           <span className='link' onClick={handleClearSearch}>
                              Shop
                           </span>
                        ) : (
                           'Shop'
                        )}{' '}
                        {searchFilter && (
                           <span>
                              &gt;{' '}
                              {searchFilter[0].toUpperCase() +
                                 searchFilter.slice(1)}
                           </span>
                        )}
                     </h6>
                     <div className='products__grid'>{ProductsGridOne}</div>
                  </main>
               </section>
            </>
         )}
      </>
   )
}

export default Shop
