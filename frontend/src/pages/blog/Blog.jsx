import React from 'react'
import './Blog.scss'
import PageBanner from '../../components/pageBanner/PageBanner'
import { blogBanner, blogs } from '../../data'
import BlogCard from '../../components/blogCard/BlogCard'

const Blog = () => {

  const Blogs = blogs.map(blog => {
    return(
      < BlogCard 
        key={blog.id}
        {...blog}
      />
    )
  });
  return (
    <div className='blog__page'>
        < PageBanner  {...blogBanner}/>
        <div className="blogs__section">
          {Blogs}
        </div>
    </div>
  )
}

export default Blog