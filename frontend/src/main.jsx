// ** React imports
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'

// ** Toast
import { ToastContainer } from 'react-toastify'

// ** Fallback loader
import Spinner from './components/spinner/FallbackSpinner'

// ** Styles
import '/src/scss/style.scss'
import './index.css'
import './slick/slick.css'
import './slick/slick-theme.css'
import 'react-toastify/dist/ReactToastify.css'

// ** Store
import { Provider } from 'react-redux'
import store from './store/index.js'

// ** App config
import { appConfig } from './configs/appConfig.js'

// ** Lazy load app
const LazyApp = lazy(() => import('./App.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <LazyApp />
        <ToastContainer
          position={appConfig.layout.toastPostision}
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme={appConfig.layout.theme}
        />
      </Suspense>
    </Provider>
  </React.StrictMode>
)
