<<<<<<< HEAD
// server/models/Order.js
=======
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
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
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
<<<<<<< HEAD

  // make this a sparse unique index
  stripeSessionId: {
    type: String,
    unique: true,
    sparse: true
  }
=======
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
});

module.exports = mongoose.model("Order", OrderSchema);
