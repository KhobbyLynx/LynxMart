import { createSlice } from '@reduxjs/toolkit'

const cartItems = JSON.parse(localStorage.getItem('cartItems'))
const sumTotal = JSON.parse(localStorage.getItem('sumTotal'))
const overAllTotal = JSON.parse(localStorage.getItem('overAllTotal'))

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    itemsList: cartItems ? cartItems : [],
    totalQuantity: cartItems?.length || 0,
    totalAmount: sumTotal || 0,
    shippingFee: 100,
    overallTotal: overAllTotal || 0,
  },
  reducers: {
    updateCartItems(state, action) {
      const newItem = action.payload

      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      )

      if (existingItem) {
        state.itemsList = state.itemsList.filter(
          (item) => item.id !== newItem.id
        )

        state.totalQuantity--
        existingItem.totalPrice -= existingItem.price
      } else {
        state.itemsList.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        })

        state.totalQuantity++
      }

      if (state.itemsList.length > 30) {
        state.itemsList.shift() // Remove the oldest product (first element)
      }

      console.log(state.itemsList)
      localStorage.setItem('cartItems', JSON.stringify(state.itemsList))
    },

    removeFromCart(state, action) {
      const id = action.payload
      state.itemsList = state.itemsList.filter((item) => item.id !== id)
      state.totalQuantity--

      // Recalculate totalAmount and overallTotal
      state.totalAmount = calculateTotalAmount(state.itemsList)
      state.overallTotal = state.totalAmount + state.shippingFee

      localStorage.setItem('overAllTotal', JSON.stringify(state.overallTotal))
      localStorage.setItem('cartItems', JSON.stringify(state.itemsList))
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const item = state.itemsList.find((item) => item.id === id)

      if (item) {
        item.quantity = quantity
      }

      // Recalculate totalAmount and overallTotal
      state.totalAmount = calculateTotalAmount(state.itemsList)
      state.overallTotal = state.totalAmount + state.shippingFee

      localStorage.setItem('overAllTotal', JSON.stringify(state.overallTotal))
      localStorage.setItem('cartItems', JSON.stringify(state.itemsList))
    },
  },
})

// Helper function to calculate totalAmount
const calculateTotalAmount = (itemsList) => {
  let totalAmount = 0
  itemsList.forEach((item) => {
    totalAmount += item.price * item.quantity
  })
  localStorage.setItem('sumTotal', JSON.stringify(totalAmount))
  return totalAmount
}

export const cartActions = cartSlice.actions

export default cartSlice
