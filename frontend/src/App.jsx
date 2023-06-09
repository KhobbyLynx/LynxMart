import './App.scss'
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
import AccountLayout from './pages/account/AccountLayout';
import LogIn from './pages/account/LogIn';
import SignUp from './pages/account/SignUp';
import ForgotPassword from './pages/account/ForgotPassword';
import { useSelector } from 'react-redux';
import Checkout from './pages/checkout/Checkout';
import CheckoutForm from './components/checkoutForm/CheckoutForm';
import Delivery from './components/delivery/Delivery';
import Payment from './components/payment/Payment';

function App() {
  const cartItems = useSelector(state => state.cart.itemsList);
  console.log(cartItems)
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
              <Route path='cart' element={ < Cart /> } />
              <Route path='wishlist' element={ < WishList /> }/>
              <Route path=':id' element={ < ProductDetails /> }/>
          </Route>
          <Route path='/account' element={ <AccountLayout/> }>
              <Route path='login' element={<LogIn/>} /> 
              <Route path='signup' element={<SignUp/>} /> 
              <Route path='forgotpassword' element={<ForgotPassword/>} /> 
          </Route>
          <Route path='cart/checkout' element={ < Checkout/> }>
            <Route index element={ <CheckoutForm/>}/>
            <Route path='delivery' element={<Delivery/>}/>
            <Route path='payment' element={<Payment />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;