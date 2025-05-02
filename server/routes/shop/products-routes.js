const express = require("express");
const {
  getFilteredProducts,
  getProductDetails
} = require("../../controllers/shop/products-controller");

const router = express.Router();

router.get("/", getFilteredProducts);   // /api/shop/products
router.get("/:id", getProductDetails);  // /api/shop/products/:id

module.exports = router;
