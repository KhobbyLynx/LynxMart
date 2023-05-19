import React from 'react'
import './BlogCard.scss'
import { Link } from 'react-router-dom'

const BlogCard = ({ blogImg, title, desc, date }) => {
  return (
    <div className='blog__card'>
        <div className="blog__box">
            <div className="blog__image">
                <img src={blogImg} alt="blog image" />
            </div>
            <div className="blog__details">
                <h2>{title}</h2>
                <p>{desc}</p>
                <Link className='blog__link'>Continue Reading</Link>
            </div>
            <span>{date}</span>
        </div>
    </div>
  )
}

export default BlogCard