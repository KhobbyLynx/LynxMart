import { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../footer/Footer'
import './MainLayout.scss'
import Newsletter from '../newsletter/Newsletter'

const MainLayout = () => {
   const { pathname } = useLocation()

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
      <div className='main__layout'>
         <Navbar style={styles} />
         <Outlet />
         {pathname === '/cart' ? null : <Newsletter />}
         <Footer />
      </div>
   )
}

export default MainLayout
