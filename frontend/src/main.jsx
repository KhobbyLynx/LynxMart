import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Spinner from './components/spinner/FallbackSpinner'

import '../src/scss/style.scss'
import './index.css'
import './slick/slick.css'
import './slick/slick-theme.css'
import store from './store/index.js'

// ** Lazy load app
const LazyApp = lazy(() => import('./App.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <LazyApp />
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme='light'
        />
      </Suspense>
    </Provider>
  </React.StrictMode>
)
