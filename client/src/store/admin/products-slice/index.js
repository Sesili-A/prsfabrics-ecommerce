// client/src/store/admin/products-slice/index.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/admin/products";

// ========== Thunks ==========

// CREATE a new product
export const addNewProduct = createAsyncThunk(
  "adminProducts/addNewProduct",
  async (productData) => {
    const response = await axios.post(BASE_URL, productData);
    return response.data; // { success, data }
  }
);

// READ all products
export const fetchAllProducts = createAsyncThunk(
  "adminProducts/fetchAllProducts",
  async () => {
    const response = await axios.get(`${BASE_URL}`);
    return response.data; // { success, data }
  }
);

// UPDATE a product
export const editProduct = createAsyncThunk(
  "adminProducts/editProduct",
  async ({ id, productData }) => {
    const response = await axios.put(`${BASE_URL}/edit/${id}`, productData);
    return response.data; // { success, data }
  }
);

// DELETE a product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`);
    return { id, ...response.data }; // { id, success, message }
  }
);

// ========== Slice ==========
const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState: {
    productList: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.productList.push(action.payload.data);
        }
      })
      .addCase(addNewProduct.rejected, (state) => {
        state.isLoading = false;
      })

      // READ
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.success
          ? action.payload.data
          : [];
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
      })

      // UPDATE
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          const updatedProduct = action.payload.data;
          const index = state.productList.findIndex(
            (p) => p._id === updatedProduct._id
          );
          if (index !== -1) {
            state.productList[index] = updatedProduct;
          }
        }
      })
      .addCase(editProduct.rejected, (state) => {
        state.isLoading = false;
      })

      // DELETE
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.productList = state.productList.filter(
            (p) => p._id !== action.payload.id
          );
        }
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Export reducer
export default adminProductsSlice.reducer;
