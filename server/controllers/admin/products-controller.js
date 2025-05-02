// server/controllers/admin/products-controller.js
const Product = require("../../models/Product");

// Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { title, description, price, brand, category } = req.body;
    const imageUrl = req.body.imageUrl || (req.file ? req.file.path : "");
    const product = new Product({
      title,
      description,
      price,
      brand,
      category,
      image: imageUrl,
    });
    const savedProduct = await product.save();
    res.status(201).json({ success: true, data: savedProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Edit product
const editProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// You already handle image upload in the route, so this is optional
const handleImageUpload = (req, res) => {
  // No need if already handled directly in route
};

module.exports = {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
};
