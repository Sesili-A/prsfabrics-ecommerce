const express = require("express");

// Import necessary functions from the controller
const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");

// Import the upload middleware for image handling
const { upload } = require("../../helpers/cloudinary");

// Import auth and role middleware
const { authMiddleware } = require("../../controllers/auth/auth-controller");
const { adminOnly } = require("../../middleware/rolemiddleware");

const router = express.Router();

// Route for uploading images (only accessible by admin)
router.post(
  "/upload-image",
  authMiddleware,
  adminOnly,
  upload.single("my_file"),
  handleImageUpload
);

// Route for adding a product (only accessible by admin)
router.post("/add", authMiddleware, adminOnly, addProduct);

// Route for editing a product (only accessible by admin)
router.put("/edit/:id", authMiddleware, adminOnly, editProduct);

// Route for deleting a product (only accessible by admin)
router.delete("/delete/:id", authMiddleware, adminOnly, deleteProduct);

// Route for fetching all products (this could be public, or only admin depending on your app)
router.get("/get", authMiddleware, adminOnly, fetchAllProducts);

module.exports = router;
