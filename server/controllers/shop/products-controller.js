// server/controllers/shop/products-controller.js
const Product = require("../../models/Product");

// fetch with optional filters
const getFilteredProducts = async (req, res) => {
  try {
    const filters = {};
    if (req.query.category) filters.category = req.query.category;
    const products = await Product.find(filters);
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// fetch single product by ID
const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getFilteredProducts,
  getProductDetails,
};
