import Product from '../../models/productSchema.js';

// GET USER'S PRODUCTS
export const getUserProducts = async (req, res) => {
  const user = req.user;
  try {
    const products = await Product.find({ userId: user._id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};