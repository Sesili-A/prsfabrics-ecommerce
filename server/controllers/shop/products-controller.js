const Product = require("../../models/Product");

// GET /api/shop/products?category=&brand=&sortBy=
exports.getFilteredProducts = async (req, res) => {
  try {
    console.log("💡 Hit /api/shop/products route");
    const { category, brand, sortBy } = req.query;

    let query = {};
    if (category) query.category = category;
    if (brand) query.brand = brand;

    let sortOptions = {};
    if (sortBy === "price-lowtohigh") sortOptions.price = 1;
    else if (sortBy === "price-hightolow") sortOptions.price = -1;

    const products = await Product.find(query).sort(sortOptions);

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Add this missing function for /api/shop/products/:id
exports.getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
