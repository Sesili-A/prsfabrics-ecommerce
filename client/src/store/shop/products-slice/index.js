// client/src/store/shop/products-slice/index.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = "http://localhost:5000/api/shop/products";

// Fetch filtered / all products
export const fetchAllFilteredProducts = createAsyncThunk(
  "shopProducts/fetchAllFilteredProducts",
  async ({ filterParams = {}, sortParams = "" }) => {
    const res = await axios.get(BASE, {
      params: { ...filterParams, sortBy: sortParams },
    });
    return res.data;
  }
);

// Fetch single product details
export const fetchProductDetails = createAsyncThunk(
  "shopProducts/fetchProductDetails",
  async (id) => {
    const res = await axios.get(`${BASE}/${id}`);
    return res.data;
  }
);

const shopProductsSlice = createSlice({
  name: "shopProducts",
  initialState: {
    productList: [],
    productDetails: null,
    isLoading: false,
  },
  reducers: {
    // <-- add this reducer so you can clear productDetails
    setProductDetails(state, action) {
      state.productDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // list
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.productList = payload.success ? payload.data : [];
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
      })

      // details
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.productDetails = payload.success ? payload.data : null;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setProductDetails } = shopProductsSlice.actions;
export default shopProductsSlice.reducer;
