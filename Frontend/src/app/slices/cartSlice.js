import { createSlice, createSelector } from "@reduxjs/toolkit";

/**
 * Cart item shape:
 * { id, slug, name, price, image, qty }
 */
const initialState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const { id, slug, name, price, image, qty = 1 } = payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) existing.qty += qty;
      else state.items.push({ id, slug, name, price, image, qty });
    },
    removeItem(state, { payload: id }) {
      state.items = state.items.filter((i) => i.id !== id);
    },
    increase(state, { payload: id }) {
      const it = state.items.find((i) => i.id === id);
      if (it) it.qty += 1;
    },
    decrease(state, { payload: id }) {
      const it = state.items.find((i) => i.id === id);
      if (it && it.qty > 1) it.qty -= 1;
    },
    setQty(state, { payload }) {
      const { id, qty } = payload;
      const it = state.items.find((i) => i.id === id);
      if (it) it.qty = Math.max(1, qty | 0);
    },
    clearCart(state) {      // ✅ renamed from clear to clearCart
      state.items = [];
    },
  },
});

export const { addItem, removeItem, increase, decrease, setQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

/* -------- Selectors -------- */
export const selectCartItems = (s) => s.cart.items;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.qty, 0)
);

export const selectSubtotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0)
);

// Simple shipping: free ≥ 5000 else 250 (0 if empty)
export const selectShipping = createSelector([selectSubtotal], (subtotal) =>
  subtotal === 0 ? 0 : subtotal >= 5000 ? 0 : 250
);

export const selectTotal = createSelector(
  [selectSubtotal, selectShipping],
  (subtotal, shipping) => subtotal + shipping
);
