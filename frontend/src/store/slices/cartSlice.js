import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
 name: 'cart',
 initialState: {
  itemsList: [],
  totalQuantity: 0,
  totalAmount: 0,
  shippingFee: 100,
  overallTotal: 0,
 },
 reducers: {
  addOrRemoveFromCart(state, action) {
   const newItem = action.payload
   const existingItem = state.itemsList.find((item) => item.id === newItem.id)
   if (existingItem) {
    const id = action.payload
    state.itemsList = state.itemsList.filter((item) => item.id !== newItem.id)
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
   // Recalculate totalAmount and overallTotal
   state.totalAmount = calculateTotalAmount(state.itemsList)
   state.overallTotal = state.totalAmount + state.shippingFee
  },
  removeFromCart(state, action) {
   const id = action.payload
   state.itemsList = state.itemsList.filter((item) => item.id !== id)
   state.totalQuantity--
   // Recalculate totalAmount and overallTotal
   state.totalAmount = calculateTotalAmount(state.itemsList)
   state.overallTotal = state.totalAmount + state.shippingFee
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
  },
 },
})

// Helper function to calculate totalAmount
const calculateTotalAmount = (itemsList) => {
 let totalAmount = 0
 itemsList.forEach((item) => {
  totalAmount += item.price * item.quantity
 })
 return totalAmount
}

export const cartActions = cartSlice.actions

export default cartSlice
