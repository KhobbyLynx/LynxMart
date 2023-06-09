import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
   name: 'cart',
   initialState: {
    itemsList: [],
    totalQuantity: 0
   },
   reducers: {
    addOrRemoveFromCart(state, action) {
        const newItem = action.payload;
        const existingItem = state.itemsList.find((item) => item.id === newItem.id);
        if(existingItem) {
            const id = action.payload;
            state.itemsList = state.itemsList.filter(item => item.id !== newItem.id);
            state.totalQuantity--;
            existingItem.totalPrice -= existingItem.price;
        } else {
            state.itemsList.push({
                ...newItem,
                quantity: 1,
                totalPrice: newItem.price,
            });
            console.log("newItem", newItem)
            state.totalQuantity++
        }
    },
    removeFromCart(state, action) {
        const id = action.payload;
        state.itemsList = state.itemsList.filter(item => item.id !== id);
        state.totalQuantity--;
    },
    updateQuantity: (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.itemsList.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
        }
    },
}
});

export const cartActions = cartSlice.actions;

export default cartSlice;


