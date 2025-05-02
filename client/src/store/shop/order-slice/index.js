import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk: Create a new order (PayPal or COD)
export const createNewOrder = createAsyncThunk(
  "shopOrder/createNewOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await axios.post("/api/shop/order/create", orderData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk: Capture PayPal payment
export const capturePayment = createAsyncThunk(
  "shopOrder/capturePayment",
  async ({ paymentId, payerId, orderId }, thunkAPI) => {
    try {
      const response = await axios.post("/api/shop/order/capture", {
        paymentId,
        payerId,
        orderId,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk: Get all orders for the current user
export const getAllOrdersByUserId = createAsyncThunk(
  "shopOrder/getAllOrdersByUserId",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/shop/order/list/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk: Get one order’s details
export const getOrderDetails = createAsyncThunk(
  "shopOrder/getOrderDetails",
  async (orderId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/shop/order/details/${orderId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orders: [],
  orderDetails: null,
  error: null,
};

const orderSlice = createSlice({
  name: "shopOrder",
  initialState,
  reducers: {
    resetOrderDetails(state) {
      state.orderDetails = null;
      state.approvalURL = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createNewOrder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.approvalURL) state.approvalURL = payload.approvalURL;
        state.orderId = payload.orderId || null;
      })
      .addCase(createNewOrder.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // capturePayment
      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(capturePayment.fulfilled, (state) => {
        state.isLoading = false;
        // once captured, we no longer need an approvalURL
        state.approvalURL = null;
      })
      .addCase(capturePayment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // getAllOrdersByUserId
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orders = payload.data || [];
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orders = [];
      })
      // getOrderDetails
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orderDetails = payload.data || null;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

// Export actions
export const { resetOrderDetails } = orderSlice.actions;

// Export reducer
export default orderSlice.reducer;
