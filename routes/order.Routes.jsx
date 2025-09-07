import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  placeOrderPaystack,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

// User routes
router.post("/place", authMiddleware(), placeOrder); // Cash on Delivery
router.post("/place-stripe", authMiddleware(), placeOrderStripe);
router.post("/verify-stripe", authMiddleware(), verifyStripe);
router.post("/place-paystack", authMiddleware(), placeOrderPaystack);
router.get("/my-orders", authMiddleware(), userOrders);

// Admin routes
router.get("/all", authMiddleware("admin"), allOrders);
router.put("/update-status", authMiddleware("admin"), updateStatus);

export default router;
