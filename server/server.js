<<<<<<< HEAD
=======
// server.js
require("dotenv").config();

>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

<<<<<<< HEAD
// Import all routes
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
=======
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
<<<<<<< HEAD
const commonFeatureRouter = require("./routes/common/feature-routes");

// Initialize app and set port
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect("mongodb+srv://sesilia22aim:aW725fntz9Iv9Tu0@prs-fabrics.hjcikfe.mongodb.net/?retryWrites=true&w=majority&appName=PRS-Fabrics")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
];

// CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Allow server-to-server or tools like Postman
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS policy blocks access from ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
=======

const commonFeatureRouter = require("./routes/common/feature-routes");

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 2. Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
<<<<<<< HEAD
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());

// Route mounting
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
=======
  })
);
app.use(cookieParser());
app.use(express.json());

// 3. Mount Auth Routes
app.use("/api/auth", authRouter);

// 4. Mount Admin Routes (protected via authMiddleware + adminOnly)
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

// 5. Mount Shop Routes
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
<<<<<<< HEAD
app.use("/api/common/feature", commonFeatureRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
=======

// 6. Mount Common Feature Routes
app.use("/api/common/feature", commonFeatureRouter);

// 7. 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// 8. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is now running on port ${PORT}`);
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
});
