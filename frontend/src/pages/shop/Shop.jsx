import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { getProducts } from '../../utils/api'
import { MdOutlineSearchOff } from 'react-icons/md'
import { Link, useSearchParams } from 'react-router-dom'
import './Shop.scss'
import ProductCard from '../../components/products/ProductCard'
import { all } from 'axios'

export function loader() {
  return getProducts()
}

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const products = useLoaderData()
  const searchFilter = searchParams.get('q')
  const catFilter = searchParams.get('cat')
  const brandFilter = searchParams.get('brand')

  const filteredProducts = searchFilter
    ? products.filter((item) =>
        item.name.trim().toLowerCase().includes(searchFilter.toLowerCase())
      )
    : catFilter
    ? products.filter((item) =>
        item.category.trim().toLowerCase().includes(catFilter.toLowerCase())
      )
    : brandFilter
    ? products.filter((item) =>
        item.brandName.trim().toLowerCase().includes(brandFilter.toLowerCase())
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
        <div className='no-product-found dfacjc fdc'>
          <div className='no-product-found__icon-container df'>
            <MdOutlineSearchOff className='no-product-found__icon' size={64} />
          </div>
          <h6 className='no-product-found__title'>
            There are no results for "{searchFilter || catFilter || brandFilter}
            "
          </h6>
          <div className='no-product-found__message dfacjc fdc'>
            <p>- Item may be out of stock</p>
            <p>- Check your spelling for typing errors</p>
            <p>- Try searching with short and simple keywords</p>
            <p>
              - Try searching more general terms - you can then filter the
              search results
            </p>
          </div>
          <Link to='/'>
            <button className='no-product-found__btn'>go to homepage</button>
          </Link>
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
                    &gt; {searchFilter[0].toUpperCase() + searchFilter.slice(1)}
                  </span>
                )}
              </h6>
              <div className='product-grid'>{ProductsGridOne}</div>
            </main>
          </section>
        </>
      )}
    </>
  )
}

export default Shop
