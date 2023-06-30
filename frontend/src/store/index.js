import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
// import searchReducer from './slices/searchSlice'

const store = configureStore({
 reducer: {
  cart: cartSlice.reducer,
  //   search: searchReducer,
 },
})

export default store
