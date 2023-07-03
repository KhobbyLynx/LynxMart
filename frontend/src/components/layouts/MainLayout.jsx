import { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../footer/Footer'
import './MainLayout.scss'
import Newsletter from '../newsletter/Newsletter'
import HashLoader from 'react-spinners/HashLoader'

const MainLayout = () => {
  const { pathname } = useLocation()
  const [isPending, setIsPending] = useState(false)

  const [navTop, setNavTop] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      <Navbar style={styles} setIsPending={setIsPending} />
      {isPending && (
        <>
          <div className='request-loader main-layout__loader'>
            <HashLoader color='#D65E05' loading size={60} />
          </div>
          <div className='overlay'></div>
        </>
      )}
      <div className='main__layout'>
        <Outlet />
        {pathname === '/cart' ? null : <Newsletter />}
        <Footer />
      </div>
    </>
  )
}

export default MainLayout
