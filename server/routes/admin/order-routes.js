const express = require("express");
const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller");

const router = express.Router();

router.get("/",           getAllOrdersOfAllUsers);
router.get("/:id",        getOrderDetailsForAdmin);
router.put("/:id/status", updateOrderStatus);

module.exports = router;
