<<<<<<< HEAD
// server/routes/admin/products-routes.js
const express = require("express");
=======
const express = require("express");

// Import necessary functions from the controller
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");
<<<<<<< HEAD
const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

// upload-image stays on “/upload-image”:
router.post(
  "/upload-image",
  upload.single("my_file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file" });
      }
      const result = {
        url: req.file.path,
        secure_url: req.file.path,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
      };
      res.json({ success: true, result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

// now all products-CRUD are on the root:
router
  .route("/")
  .get(fetchAllProducts)   // GET   /api/admin/products
  .post(addProduct);       // POST  /api/admin/products

router
  .route("/:id")
  .put(editProduct)        // PUT   /api/admin/products/:id
  .delete(deleteProduct);  // DELETE/api/admin/products/:id
=======

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
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e

module.exports = router;
