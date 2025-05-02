<<<<<<< HEAD
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
=======
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );

    console.log(result);

    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );

    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
    },
  },
  extraReducers: (builder) => {
    builder
<<<<<<< HEAD
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
=======
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
      });
  },
});

<<<<<<< HEAD
export const { setProductDetails } = shopProductsSlice.actions;
export default shopProductsSlice.reducer;
=======
export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
