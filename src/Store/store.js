import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../Slices/uiSlice";
import cartReducer from "../Slices/cartSlice";
import productReducer from "../Slices/productSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    products: productReducer,
  },
});
