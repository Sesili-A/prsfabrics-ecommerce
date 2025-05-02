<<<<<<< HEAD
// client/src/store/admin/order-slice/index.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrdersForAdmin = createAsyncThunk(
  "adminOrders/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get("http://localhost:5000/api/admin/orders");
=======
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/get`
    );

>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
<<<<<<< HEAD
  "adminOrders/getOrderDetailsForAdmin",
  async (orderId) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/${orderId}`
    );
=======
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/details/${id}`
    );

>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
<<<<<<< HEAD
  "adminOrders/updateOrderStatus",
  async ({ orderId, status }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/orders/${orderId}/status`,
      { status }
    );
=======
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/orders/update/${id}`,
      {
        orderStatus,
      }
    );

>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
    return response.data;
  }
);

<<<<<<< HEAD
const adminOrdersSlice = createSlice({
  name: "adminOrders",
  initialState: { orderList: [], orderDetails: null, isLoading: false },
  reducers: {
    resetOrderDetails(state) {
=======
const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      console.log("resetOrderDetails");

>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
<<<<<<< HEAD
      .addCase(getAllOrdersForAdmin.pending, (s) => { s.isLoading = true; })
      .addCase(getAllOrdersForAdmin.fulfilled, (s, a) => {
        s.isLoading = false;
        s.orderList = a.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (s) => { s.isLoading = false; })

      .addCase(getOrderDetailsForAdmin.pending, (s) => { s.isLoading = true; })
      .addCase(getOrderDetailsForAdmin.fulfilled, (s, a) => {
        s.isLoading = false;
        s.orderDetails = a.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (s) => { s.isLoading = false; })

      .addCase(updateOrderStatus.pending, (s) => { s.isLoading = true; })
      .addCase(updateOrderStatus.fulfilled, (s, a) => {
        s.isLoading = false;
        // sync the updated order back into both orderDetails & orderList
        const updated = a.payload.data;
        if (s.orderDetails?._id === updated._id) s.orderDetails = updated;
        const idx = s.orderList.findIndex(o => o._id === updated._id);
        if (idx > -1) s.orderList[idx] = updated;
      })
      .addCase(updateOrderStatus.rejected, (s) => { s.isLoading = false; });
  },
});

export const { resetOrderDetails } = adminOrdersSlice.actions;
export default adminOrdersSlice.reducer;
=======
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
