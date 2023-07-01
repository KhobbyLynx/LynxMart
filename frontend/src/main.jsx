import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import App from './App.jsx'
import '../src/scss/style.scss'
import './index.css'
import './slick/slick.css'
import './slick/slick-theme.css'
import store from './store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <Provider store={store}>
         <App />
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
      </Provider>
   </React.StrictMode>
)
