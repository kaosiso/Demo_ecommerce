import axios from "axios";
import { validateOrderFields, createOrder } from "./orderHelpers.js";

export const placeOrderPaystack = async (req, res) => {
  try {
    const { reference, userId, items, amount, address } = req.body;

    if (
      !reference ||
      !validateOrderFields({ userId, items, amount, address })
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Missing required Paystack order fields",
        });
    }

    const verificationResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.VITE_PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = verificationResponse.data;

    if (paymentData.status && paymentData.data.status === "success") {
      const newOrder = await createOrder({
        userId,
        items,
        amount,
        address,
        paymentMethod: "Paystack",
        payment: true,
        transactionId: reference,
      });

      res.json({
        success: true,
        message: "Order placed via Paystack",
        orderId: newOrder._id,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Paystack error occurred";
    res.status(500).json({ success: false, message: msg });
  }
};
