import Product from "../../models/productSchema.js";

// EDIT PRODUCT
export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, color, size } = req.body;
  const reqId = req.user._id;

  try {
    const product = await Product.findOne({ _id: id, userId: reqId });
    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.color = color ?? product.color;
    product.size = size ?? product.size;

    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};