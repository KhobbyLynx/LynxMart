import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import Blog from './pages/blog/Blog';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Cart from './pages/cart/Cart';
import ProductDetails from './components/productDetails/ProductDetails';
import WishList from './pages/wishList/WishList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <MainLayout/> } >
              <Route index element={ < Home /> }/>
              <Route path='shop' element={ < Shop /> }/>
              <Route path='blog' element={ < Blog /> }/>
              <Route path='about' element={ < About /> }/>
              <Route path='contact' element={ < Contact /> }/>
              <Route path='cart' element={ < Cart /> }/>
              <Route path='wishlist' element={ < WishList /> }/>
              <Route path='productDetails' element={ < ProductDetails /> }/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App