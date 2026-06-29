import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URI = import.meta.env.VITE_API_URI;
// 1. Define the Async Thunk Action to POST Order Details to Backend API
export const placeOrder = createAsyncThunk(
  "cart/placeOrder",
  async (orderData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${API_URI}/api/v1/order/place`,
        orderData,
      );

      // Clear the cart out globally on successful order verification
      dispatch(cartSlice.actions.clearCart());

      return response.data; // Success payload from server
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to place your order. Please try again.",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // [{ id, name, price, qty }]
    loading: false,
    error: null,
    lastPlacedOrder: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.qty += delta;

        if (item.qty <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.lastPlacedOrder = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
