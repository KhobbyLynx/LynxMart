import React, { useState, useEffect, useRef } from 'react'
import { BiUser, BiMenu, BiSupport } from 'react-icons/bi'
import { RiHeartLine } from 'react-icons/ri'
import { BsGlobe, BsFillCartFill } from 'react-icons/bs'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { images } from '../../constants'
import './Navbar.scss'
import Search from '../search/Search'
import { useSelector } from 'react-redux'
import newRequest from '../../utils/newRequest'
import { dropdown } from '../../data'

const Navbar = ({ setIsPending, setHamburgerMenu }) => {
  const navigate = useNavigate()
  const cartItemsQuantity = useSelector((state) => state.cart.totalQuantity)
  const [open, setOpen] = useState(false)
  let menuRef = useRef()

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  const activeStyles = {
    fontWeight: 'bold',
    borderBottom: '2px solid #000',
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const logout = async () => {
    setIsPending(true)
    setOpen(false)
    try {
      await newRequest.post(`/users/logout`)
      localStorage.removeItem('currentUser')
      setIsPending(false)
      navigate('/account/login')
    } catch (error) {
      console.log(error)
      setIsPending(false)
    }
  }

  const linkToRouteMap = {
    'my account': '.',
    orders: '/orders',
    inbox: '/inbox',
    'saved items': '/wishlist',
    'recently viewed': '/history',
  }

  const dropdownList = dropdown.map((item) => (
    <Link
      to={linkToRouteMap[item.name]}
      key={item.id}
      onClick={() => setOpen(false)}
    >
      <DropdownItem {...item} />
    </Link>
  ))

  return (
    <>
      <div className='navbar'>
        <div className='navbar__top'>
          <div className='nav__top dfac'>
            <div className='navbar__left dfac'>
              <BiMenu
                className='menu__icon'
                onClick={() => setHamburgerMenu(true)}
              />
              <Link to='/'>
                <img className='logo' src={images.logo} alt='logo' />
              </Link>
            </div>
            <Search className='navbar__search' />
            <div className='navbar__right'>
              {!currentUser ? (
                <Link to='account' className='link'>
                  <button className='navbar__user dfac'>
                    <BiUser className='user__icon' />
                    <span>Account</span>
                  </button>
                </Link>
              ) : (
                <>
                  <div className='menu' ref={menuRef}>
                    <button
                      className='user__acc menu__trigger dfac'
                      onClick={() => setOpen(!open)}
                    >
                      <div className='profile__img dfac'>
                        {currentUser.name[0].toUpperCase()}
                      </div>
                      <span>{`Hi, ${currentUser.name.split(' ')[0]}`}</span>
                    </button>

                    <div
                      className={`menu__dropdown ${
                        open ? 'active' : 'inactive'
                      }`}
                    >
                      <h3 className='dfac fdc'>
                        Lynx Mart
                        <br />
                        <span>Welcome</span>
                      </h3>
                      <ul>{dropdownList}</ul>
                      <button onClick={logout} className='logout-btn'>
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
              <Link to='cart'>
                <button className='navbar__cart dfac'>
                  <BsFillCartFill className='cart__icon' />
                  <div className='icon__count'>{cartItemsQuantity}</div>
                </button>
              </Link>
            </div>
          </div>
          <hr className='line' />
          <Search className='mobile__search' />
        </div>
        <hr className='navbar__line' />
        <div className='navbar__bottom dfac'>
          <div className='links__container dfac'>
            <NavLink
              to='.'
              end
              className='navlink link'
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Home
            </NavLink>
            {['shop', 'blog', 'about', 'contact'].map((navlink) => (
              <NavLink
                to={navlink}
                key={navlink}
                className='navlink'
                style={({ isActive }) => (isActive ? activeStyles : null)}
              >
                {navlink}
              </NavLink>
            ))}
          </div>
          <div className='icon__links dfac'>
            <div className='icon__container dfac'>
              <Link to='wishlist'>
                <RiHeartLine className='wishlist icon__link' />
              </Link>
              <span className='icon__count dfac'>0</span>
            </div>
            <div className='dfac'>
              <BiSupport className='support icon__link' />
              <span>Help</span>
            </div>
            <div className='dfac'>
              <BsGlobe className='globe icon__link' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function DropdownItem({ name, icon }) {
  return (
    <li className='dropdownItem dfac jfs'>
      <img src={icon}></img>
      <span> {name} </span>
    </li>
  )
}

export default Navbar
