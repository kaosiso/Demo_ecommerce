import Product from "../../models/productSchema.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  const { name, price, color, size } = req.body;
  const user = req.user;

  if (!name || !price || !color || !size) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const newProduct = new Product({ ...req.body, userId: user._id });
    await newProduct.save();
    res.status(201).json({ message: 'New product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
