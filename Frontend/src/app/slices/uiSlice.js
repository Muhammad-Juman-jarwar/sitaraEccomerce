import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartOpen: false },
  reducers: {
    openCart(state) { state.cartOpen = true; },
    closeCart(state) { state.cartOpen = false; },
    toggleCart(state) { state.cartOpen = !state.cartOpen; },
  },
});

// Actions
export const { openCart, closeCart, toggleCart } = uiSlice.actions;

// Selector (useful later)
export const selectCartOpen = (state) => state.ui.cartOpen;

export default uiSlice.reducer;
