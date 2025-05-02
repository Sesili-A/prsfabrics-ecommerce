const express = require("express");
<<<<<<< HEAD
=======

>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e
const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller");

const router = express.Router();

<<<<<<< HEAD
router.get("/",           getAllOrdersOfAllUsers);
router.get("/:id",        getOrderDetailsForAdmin);
router.put("/:id/status", updateOrderStatus);
=======
router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);
>>>>>>> f2402ecf8fc686229f4949b58ad681cfb4d3a88e

module.exports = router;
