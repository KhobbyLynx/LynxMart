import React from 'react'
import './Category.scss'
import { categories } from '../../data'

const Category = () => {
  return (
    <div className='category'>
        {categories.map(category => (
            <div key={category.id} className="cat__card">
                <img src={category.url} alt={category.title} />
                <p>{category.title}</p>
            </div>
        ))}
    </div>
  )
}

export default Category