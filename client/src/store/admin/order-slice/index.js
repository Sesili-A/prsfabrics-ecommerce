// src/store/admin/order-slice/index.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Mock data for development (if API is not yet available)
const mockMonthlyData = [
  { month: 'Jan', sales: 5000, orders: 42 },
  { month: 'Feb', sales: 6200, orders: 51 },
  { month: 'Mar', sales: 7800, orders: 63 },
  { month: 'Apr', sales: 9100, orders: 78 },
  { month: 'May', sales: 10500, orders: 92 },
];

const initialState = {
  orderList: [],
  orderDetails: null,
  analytics: null,
  isLoading: false,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/get`
    );
    
    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/details/${id}`
    );
    
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/orders/update/${id}`,
      {
        orderStatus,
      }
    );
    
    return response.data;
  }
);

export const fetchSalesAnalytics = createAsyncThunk(
  "adminOrders/fetchAnalytics",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/orders/analytics"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      // Return mock data on error for development purposes
      return {
        data: {
          totalSales: mockMonthlyData.reduce((sum, month) => sum + month.sales, 0),
          totalOrders: mockMonthlyData.reduce((sum, month) => sum + month.orders, 0),
          avgOrderValue: mockMonthlyData.reduce((sum, month) => sum + month.sales, 0) / 
                         mockMonthlyData.reduce((sum, month) => sum + month.orders, 0),
          conversionRate: 25.5,
          monthlyData: mockMonthlyData,
        }
      };
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      console.log("resetOrderDetails");
      
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      
      .addCase(fetchSalesAnalytics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSalesAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.analytics = action.payload.data || {
          totalSales: mockMonthlyData.reduce((sum, month) => sum + month.sales, 0),
          totalOrders: mockMonthlyData.reduce((sum, month) => sum + month.orders, 0),
          avgOrderValue: mockMonthlyData.reduce((sum, month) => sum + month.sales, 0) / 
                         mockMonthlyData.reduce((sum, month) => sum + month.orders, 0),
          conversionRate: 25.5,
          monthlyData: mockMonthlyData,
        };
      })
      .addCase(fetchSalesAnalytics.rejected, (state) => {
        state.isLoading = false;
        // Set fallback mock data if the API call fails
        state.analytics = {
          totalSales: mockMonthlyData.reduce((sum, month) => sum + month.sales, 0),
          totalOrders: mockMonthlyData.reduce((sum, month) => sum + month.orders, 0),
          avgOrderValue: mockMonthlyData.reduce((sum, month) => sum + month.sales, 0) / 
                         mockMonthlyData.reduce((sum, month) => sum + month.orders, 0),
          conversionRate: 25.5,
          monthlyData: mockMonthlyData,
        };
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;