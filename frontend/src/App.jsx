import './App.scss'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import Home, { loader as homePageLoader } from './pages/home/Home'
import Shop, { loader as shopPageLoader } from './pages/shop/Shop'
import Blog from './pages/blog/Blog'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import Cart from './pages/cart/Cart'
import ProductDetails, {
  loader as detailsPageLoader,
} from './components/productDetails/ProductDetails'
import WishList from './pages/wishList/WishList'
import AccountLayout from './pages/account/AccountLayout'
import LogIn from './pages/account/LogIn'
import SignUp from './pages/account/SignUp'
import ForgotPassword from './pages/account/ForgotPassword'
import Checkout from './pages/checkout/Checkout'
import CheckoutForm from './components/checkoutForm/CheckoutForm'
import Delivery from './components/delivery/Delivery'
import Payment from './components/payment/Payment'
import Error from './components/error/Error'
import RecentlyViewedItems from './pages/wishList/RecentlyViewedItems'
import Inbox from './components/inbox/Inbox'
import Orders from './components/orders/Orders'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout />} errorElement={<Error />}>
          <Route index element={<Home />} loader={homePageLoader} />
          <Route path='shop' element={<Shop />} loader={shopPageLoader} />
          <Route path='blog' element={<Blog />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='cart' element={<Cart />} />
          <Route path='wishlist' element={<WishList />} />
          <Route path='history' element={<RecentlyViewedItems />} />
          <Route path='inbox' element={<Inbox />} />
          <Route path='orders' element={<Orders />} />
          <Route
            path=':id'
            element={<ProductDetails />}
            loader={detailsPageLoader}
          />
        </Route>
        <Route path='/account' element={<AccountLayout />}>
          <Route index element={<SignUp />} />
          <Route path='login' element={<LogIn />} />
          <Route path='forgotpassword' element={<ForgotPassword />} />
        </Route>
        <Route path='cart/checkout' element={<Checkout />}>
          <Route index element={<CheckoutForm />} />
          <Route path='delivery' element={<Delivery />} />
          <Route path='payment' element={<Payment />} />
        </Route>
      </>
    )
  )
  return <RouterProvider router={router} />
}

export default App
