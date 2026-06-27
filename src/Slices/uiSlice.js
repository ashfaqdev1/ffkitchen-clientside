import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentView: "home", // 'home' | 'products'
  isCartOpen: false,
  isCheckoutOpen: false,
  isSuccessOpen: false,
  selectedProduct: null, // Holds the item when opening the Detail Modal
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNavigate: (state, action) => {
      state.currentView = action.payload;
    },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    openCheckout: (state) => {
      state.isCheckoutOpen = true;
    },
    closeCheckout: (state) => {
      state.isCheckoutOpen = false;
    },
    openSuccess: (state) => {
      state.isSuccessOpen = true;
    },
    closeSuccess: (state) => {
      state.isSuccessOpen = false;
    },
    openDetailModal: (state, action) => {
      state.selectedProduct = action.payload;
    },
    closeDetailModal: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const {
  setNavigate,
  openCart,
  closeCart,
  openCheckout,
  closeCheckout,
  openSuccess,
  closeSuccess,
  openDetailModal,
  closeDetailModal,
} = uiSlice.actions;

export default uiSlice.reducer;
