import { useState, useEffect, useRef } from 'react'
import Navbar from '../navbar/Navbar'

// ** MUI Imports
import Fab from '@mui/material/Fab'

import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { AiOutlineRight, AiFillCloseCircle } from 'react-icons/ai'
import { RiCloseFill } from 'react-icons/ri'
import Footer from '../footer/Footer'
import './MainLayout.scss'
import Newsletter from '../newsletter/Newsletter'
import HashLoader from 'react-spinners/HashLoader'
import { images } from '../../constants'
import { mobileMenu, mobileMenuCategory } from '../../data'
import ScrollToTop from '../../core/components/scroll-to-top'
import { BsArrowUp } from 'react-icons/bs'
import { appConfig } from '../../configs/appConfig'

const MainLayout = () => {
  const { pathname } = useLocation()
  const [isPending, setIsPending] = useState(false)
  const [hamburgerMenu, setHamburgerMenu] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [navTop, setNavTop] = useState(0)

  let menuRef = useRef()

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setHamburgerMenu(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  const handleScroll = () => {
    setNavTop(window.scrollY)
  }

  const styles = {
    position: 'fixed',
    top: `${navTop}px`,
    backdropFilter: 'blur(4px)',
    left: '0',
    right: '0',
    width: '100%',
    zIndex: '2',
  }

  const linkToRouteMap = {
    home: '/',
    about: '/about',
    contact: '/contact',
    shop: '/shop',
    blog: '/blog',
  }

  const handleFilterChange = (key, value) => {
    if (searchParams === '') {
      if (searchParams.has(key)) {
        searchParams.delete(key)
        setSearchParams(searchParams)
      }
    } else if (value === 'all') {
      navigate('/shop')
    } else {
      navigate(`/shop?${key}=${value}`)
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, 500)
    setHamburgerMenu(false)
  }

  return (
    <>
      <Navbar
        style={styles}
        setIsPending={setIsPending}
        setHamburgerMenu={setHamburgerMenu}
      />
      {
        <>
          {isPending && (
            <>
              <div className='request-loader dfac main-layout__loader'>
                <HashLoader color='#D65E05' loading size={60} />
              </div>
              <div className='overlay'></div>
            </>
          )}
          {hamburgerMenu && <div className='overlay'></div>}
          <div
            className={`hamburger-menu df fdc ${
              hamburgerMenu ? 'animate-menu-in' : 'animate-menu-out'
            }`}
            ref={menuRef}
          >
            <div className='hamburger-menu__head dfac jfs'>
              <div className='df'>
                <RiCloseFill
                  className='toggle-menu-icon'
                  onClick={() => setHamburgerMenu(false)}
                />
              </div>
              <div className='hamburger-menu__logo-container dfac'>
                <img src={images.logo} className='logo' alt='' />
                <span>LynxMart</span>
              </div>
            </div>
            <a href='https://wa.me/233508783805?text=I%20need%20a%20website%20for%20my%20business'>
              <div
                className='hamburger-menu__tab mt50 bb dfac'
                onClick={() => setHamburgerMenu(false)}
              >
                <img
                  className='menu-icon'
                  src='https://res.cloudinary.com/khobbylynx/image/upload/v1688345492/lynxmart/img/icons/online-support_nse2gy.png'
                  alt=''
                />
                <span>Live Help</span>
              </div>
            </a>
            <div
              className='hamburger-menu__head-tab df jsb'
              onClick={() => setHamburgerMenu(false)}
            >
              <h3>My LynxMart Account</h3>
              <AiOutlineRight />
            </div>
            {mobileMenu.map((item) => (
              <Link
                to={linkToRouteMap[item.text]}
                className='hamburger-menu__tab navlist dfac link'
                key={item.id}
                onClick={() => setHamburgerMenu(false)}
              >
                <img className='menu-icon' src={item.icon} alt='' />
                <span>{item.text}</span>
              </Link>
            ))}
            <div
              className='hamburger-menu__head-tab df jsb'
              onClick={() => setHamburgerMenu(false)}
            >
              <h3>Our Category</h3>
              <AiOutlineRight />
            </div>
            {mobileMenuCategory.map((item) => (
              <div
                className='hamburger-menu__tab navlist dfac'
                key={item.id}
                onClick={() => handleFilterChange('cat', item.text)}
              >
                <img className='menu-icon' src={item.icon} alt='' />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </>
      }
      <div className={`main__layout ${hamburgerMenu && 'inactive-scroll'} `}>
        <Outlet className='outlet' />
        {pathname === '/cart' ? null : <Newsletter />}
        <Footer />
        {appConfig.layout.scrollToTop === true ? (
          <ScrollToTop className='mui-fixed'>
            <Fab color='primary' size='small' aria-label='scroll back to top'>
              <BsArrowUp />
            </Fab>
          </ScrollToTop>
        ) : null}
      </div>
    </>
  )
}

export default MainLayout
