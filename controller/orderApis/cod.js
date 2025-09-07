import orderModel from "../../models/orderModel.js";
import userModel from "../../models/userModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    if (!items?.length || !userId || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (items, user, amount, address)",
      });
    }

    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      PaymentMethod: "COD",
      payment: false,
      date: Date.now(),
      status: "Pending",
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed with Cash on Delivery" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
