import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URI = import.meta.env.VITE_API_URL;

// 1. Define the Async Thunk Action to Fetch Products from Backend API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URI}/api/v1/product/read`);
      return response.data.data; // This returns the array of raw database documents
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products from server",
      );
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Normalize properties cleanly so both frontend apps stay unified
        state.items = action.payload.map((item) => ({
          id: item._id,
          title: item.title || "",
          desc: item.desc || item.description || "",
          category: item.category || "Dinner Sets",
          price: item.price || 0,
          stock: item.stock !== undefined ? item.stock : item.inventory || 0,
          status: item.status || "Active",
          imageUrl: item.imageUrl || "", // 🚀 Capture imageUrl cleanly
        }));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
