import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      if (!newItem) return;
      const match = state.items.find(it => (newItem.id && it.id === newItem.id) || (!newItem.id && newItem.name && it.name === newItem.name));
      if (match) {
        match.quantity = (match.quantity || 0) + (newItem.quantity || 1);
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
    },
    removeItem: (state, action) => {
      const payload = action.payload;
      const key = payload && (payload.id ?? payload.name) ? (payload.id ?? payload.name) : payload;
      state.items = state.items.filter(it => {
        if (!key) return true;
        if (it.id && it.id === key) return false;
        if (it.name && it.name === key) return false;
        return true;
      });
    },
    updateQuantity: (state, action) => {
      const { id, name, quantity } = action.payload || {};
      if (typeof quantity !== 'number') return;
      const match = state.items.find(it => (id && it.id === id) || (name && it.name === name));
      if (!match) return;
      if (quantity <= 0) {
        // remove when quantity drops to zero or below
        state.items = state.items.filter(it => it !== match);
      } else {
        match.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
