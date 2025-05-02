<<<<<<< HEAD
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
=======
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/admin/products/get"
    );

    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}`
    );

    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
<<<<<<< HEAD
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
=======
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
      });
  },
});

<<<<<<< HEAD
// Export reducer
export default adminProductsSlice.reducer;
=======
export default AdminProductsSlice.reducer;
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
