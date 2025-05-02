// client/src/store/admin/order-slice/index.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrdersForAdmin = createAsyncThunk(
  "adminOrders/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get("http://localhost:5000/api/admin/orders");
    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "adminOrders/getOrderDetailsForAdmin",
  async (orderId) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/${orderId}`
    );
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ orderId, status }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/orders/${orderId}/status`,
      { status }
    );
    return response.data;
  }
);

const adminOrdersSlice = createSlice({
  name: "adminOrders",
  initialState: { orderList: [], orderDetails: null, isLoading: false },
  reducers: {
    resetOrderDetails(state) {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
