import React from 'react'
import { Link } from 'react-router-dom';
import { BsStarFill, BsStar, BsStarHalf} from 'react-icons/bs'
import './ProductDetails.scss'
import { featuredProducts } from '../../data';
import ProductCard from '../products/ProductCard';

const ProductDetails = () => {
    const otherProducts = featuredProducts.map(pro => {
        return(
            <ProductCard key={pro.id} {...pro}/>
        )
    })
  return (
    <div className='single__product'>
        <div className="product__detail">
            <div className="product__image">
                <img src="https://res.cloudinary.com/khobbylynx/image/upload/v1683975735/lynxmart/img/products/watch/rolex_eca_sviuo1.jpg" width="100%" id="MainImg" alt="" />
                <div className="group__images">
                    <div className="group__col">
                        <img
                        src="https://res.cloudinary.com/khobbylynx/image/upload/v1683975735/lynxmart/img/products/watch/rolex_eca_sviuo1.jpg"
                        width="100%"
                        class="small__img"
                        alt=""
                        />
                    </div>
                <div className="group__col">
                    <img
                    src="https://res.cloudinary.com/khobbylynx/image/upload/v1683975741/lynxmart/img/products/watch/rolex__rwrvoi.jpg"
                    width="100%"
                    class="small__img"
                    alt=""
                    />
                </div>
                <div className="group__col">
                    <img
                    src="https://res.cloudinary.com/khobbylynx/image/upload/v1683975727/lynxmart/img/products/watch/rolex_a_dkespo.jpg"
                    width="100%"
                    className="small__img"
                    alt=""
                    />
                </div>
                <div className="group__col">
                    <img
                    src="https://res.cloudinary.com/khobbylynx/image/upload/v1683975736/lynxmart/img/products/watch/rolex_ec_vx8icn.jpg"
                    width="100%"
                    className="small__img"
                    alt=""
                    />
                </div>
                </div>
            </div>
            <div className="prodetails">
                <h6><Link to='/' className='link'>Home</Link> <span>&gt;</span> T Shirt</h6>
                <h4>Men's Fashion T Shirt</h4>
                <h2>$139.00</h2>
                <select>
                    <option>Select Size</option>
                    <option>XL</option>
                    <option>XXL</option>
                    <option>Small</option>
                    <option>Large</option>
                </select>
                <input type="number" value="1" min="1" max="99" />
                <button className="">Add To Cart</button>
                <h4>Product Details</h4>
                <span
                >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
                voluptate, dicta enim quisquam eum, odit itaque distinctio accusamus
                similique tenetur, blanditiis unde facilis illum dolor hic id
                perferendis quibusdam doloribus consectetur adipisicing elit. Ad
                deserunt repellat ipsum nesciunt repellendus, rerum quo fugit nostrum
                impedit sapiente.</span
                >
            </div>
        </div>

        <section className="featured__products">
            <h2>Featured Products</h2>
            <p>Summer Collection New Morden Design</p>
                {/* onclick="window.location.href='/products/productn8.html';" */}
            <div className="pro__container">
                {otherProducts}
            </div>
        </section>
    </div>
  )
}

export default ProductDetails;