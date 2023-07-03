import React, { useState, useEffect, useRef } from 'react'
import { BiUser, BiMenu, BiSupport } from 'react-icons/bi'
import { RiCloseFill, RiHeartLine } from 'react-icons/ri'
import { BsGlobe, BsFillCartFill } from 'react-icons/bs'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { images } from '../../constants'
import './Navbar.scss'
import Search from '../search/Search'
import { useSelector } from 'react-redux'
import newRequest from '../../utils/newRequest'
import { dropdown } from '../../data'

const Navbar = ({ setIsPending }) => {
  const navigate = useNavigate()
  const cartItemsQuantity = useSelector((state) => state.cart.totalQuantity)
  const [toggle, setToggle] = useState(false)
  const [open, setOpen] = useState(false)
  let menuRef = useRef()

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false)
        console.log(menuRef.current)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  function openMenu() {
    setToggle(true)
  }
  function closeMenu() {
    setToggle(false)
  }
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
      localStorage.setItem('currentUser', null)
      setIsPending(false)
      navigate('/account/login')
    } catch (error) {
      console.log(error)
      setIsPending(false)
    }
  }

  const dropdownList = dropdown.map((item) => (
    <DropdownItem key={item.id} {...item} onClick={() => setOpen(false)} />
  ))

  return (
    <>
      <div className='navbar'>
        <div className='navbar__top'>
          <div className='nav__top df'>
            <div className='navbar__left df'>
              {toggle ? (
                <RiCloseFill className='menu__icon' onClick={closeMenu} />
              ) : (
                <BiMenu className='menu__icon' onClick={openMenu} />
              )}
              <Link to='/'>
                <img className='navbar__logo' src={images.logo} alt='logo' />
              </Link>
            </div>
            <Search className='navbar__search' />
            <div className='navbar__right'>
              {!currentUser ? (
                <Link to='account' className='link'>
                  <button className='navbar__user df'>
                    <BiUser className='user__icon' />
                    <span>Account</span>
                  </button>
                </Link>
              ) : (
                <>
                  <div className='menu' ref={menuRef}>
                    <button
                      className='user__acc menu__trigger df'
                      onClick={() => setOpen(!open)}
                    >
                      <div className='profile__img df'>
                        {currentUser.name[0]}
                      </div>
                      <span>{`Hi, ${currentUser.name.split(' ')[0]}`}</span>
                    </button>

                    <div
                      className={`menu__dropdown ${
                        open ? 'active' : 'inactive'
                      }`}
                    >
                      <h3>
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
                <button className='navbar__cart df'>
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
        <div className='navbar__bottom df'>
          <div className='links__container df'>
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
          <div className='icon__links df'>
            <div className='icon__container df'>
              <Link to='wishlist'>
                <RiHeartLine className='wishlist icon__link' />
              </Link>
              <span className='icon__count df'>0</span>
            </div>
            <div className='df'>
              <BiSupport className='support icon__link' />
              <span>Help</span>
            </div>
            <div className='df'>
              <BsGlobe className='globe icon__link' />
            </div>
          </div>
        </div>
        {toggle && (
          <div className='menu__container'>
            <Link to='/' className='menu__link link' onClick={closeMenu}>
              Home
            </Link>
            {['shop', 'blog', 'about', 'contact'].map((navlink) => (
              <Link
                to={navlink}
                key={navlink}
                className='menu__link link'
                onClick={closeMenu}
              >
                {navlink}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function DropdownItem({ name, icon }) {
  return (
    <li className='dropdownItem'>
      <img src={icon}></img>
      <span> {name} </span>
    </li>
  )
}

export default Navbar
