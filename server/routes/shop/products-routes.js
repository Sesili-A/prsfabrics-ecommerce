const express = require("express");
<<<<<<< HEAD
const {
  getFilteredProducts,
  getProductDetails
=======
const { adminOnly } = require("../../middleware/rolemiddleware");


const {
  getFilteredProducts,
  getProductDetails,
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
} = require("../../controllers/shop/products-controller");

const router = express.Router();

<<<<<<< HEAD
router.get("/", getFilteredProducts);   // /api/shop/products
router.get("/:id", getProductDetails);  // /api/shop/products/:id
=======
router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e

module.exports = router;
