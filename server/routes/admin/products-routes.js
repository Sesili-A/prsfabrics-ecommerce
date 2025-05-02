// server/routes/admin/products-routes.js
const express = require("express");
const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");
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

module.exports = router;
