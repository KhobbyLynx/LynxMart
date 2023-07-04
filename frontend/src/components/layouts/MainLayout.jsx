import { useState, useEffect, useRef } from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import { AiOutlineRight, AiFillCloseCircle } from 'react-icons/ai'
import { RiCloseFill } from 'react-icons/ri'
import Footer from '../footer/Footer'
import './MainLayout.scss'
import Newsletter from '../newsletter/Newsletter'
import HashLoader from 'react-spinners/HashLoader'
import { images } from '../../constants'
import { mobileMenu, mobileMenuCategory } from '../../data'

const MainLayout = () => {
  const { pathname } = useLocation()
  const [isPending, setIsPending] = useState(false)
  const [hamburgerMenu, setHamburgerMenu] = useState(false)
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
          >
            <div className='hamburger-menu__head dfac jfs' ref={menuRef}>
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
            <div className='hamburger-menu__tab mt50 bb dfac'>
              <img
                className='menu-icon'
                src='https://res.cloudinary.com/khobbylynx/image/upload/v1688345492/lynxmart/img/icons/online-support_nse2gy.png'
                alt=''
              />
              <span>Live Help</span>
            </div>
            <div className='hamburger-menu__head-tab df jsb'>
              <h3>My LynxMart Account</h3>
              <AiOutlineRight />
            </div>
            {mobileMenu.map((item) => (
              <div className='hamburger-menu__tab navlist dfac' key={item.id}>
                <img className='menu-icon' src={item.icon} alt='' />
                <span>{item.text}</span>
              </div>
            ))}
            <div className='hamburger-menu__head-tab df jsb'>
              <h3>Our Category</h3>
              <AiOutlineRight />
            </div>
            {mobileMenuCategory.map((item) => (
              <div className='hamburger-menu__tab navlist dfac' key={item.id}>
                <img className='menu-icon' src={item.icon} alt='' />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </>
      }
      <div className={`main__layout ${hamburgerMenu && 'inactive-scroll'} `}>
        <Outlet />
        {pathname === '/cart' ? null : <Newsletter />}
        <Footer />
      </div>
    </>
  )
}

export default MainLayout
