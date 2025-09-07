import orderModel from "../../models/orderModel.js";
import userModel from "../../models/userModel.js";

export const validateOrderFields = ({ userId, items, amount, address }) => {
  if (!userId || !amount || !address || !items?.length) {
    return false;
  }
  return true;
};

export const createOrder = async ({
  userId,
  items,
  amount,
  address,
  paymentMethod,
  payment = false,
  transactionId = null,
}) => {
  const newOrder = new orderModel({
    userId,
    items,
    address,
    amount,
    PaymentMethod: paymentMethod,
    payment,
    date: Date.now(),
    transactionId,
    status: "Pending",
  });

  await newOrder.save();
  await userModel.findByIdAndUpdate(userId, { cartData: {} });

  return newOrder;
};
