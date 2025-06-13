const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
});

// Add analytics methods
OrderSchema.statics.getSalesAnalytics = async function () {
  return this.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$totalAmount" },
        totalOrders: { $sum: 1 },
        avgOrderValue: { $avg: "$totalAmount" },
      },
    },
    { $project: { _id: 0 } },
  ]);
};

OrderSchema.statics.getMonthlySales = async function () {
  return this.aggregate([
    {
      $group: {
        _id: { $month: "$orderDate" },
        totalSales: { $sum: "$totalAmount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id": 1 } },
  ]);
};

module.exports = mongoose.model("Order", OrderSchema);