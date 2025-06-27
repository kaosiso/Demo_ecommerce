import Cart from "../../models/cartSchema.js";
import Product from "../../models/productSchema.js";

const createCartItem = async (req, res) => {
  const user = req.user;
  const { id: productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      const newCart = new Cart({
        userId: user._id,
        products: [{ productId: productId, quantity: 1 }],
      });
      await newCart.save();
      return res
        .status(201)
        .json({ message: "Cart created with new product", cart: newCart });
    } else {
      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ productId: productId, quantity: 1 });
      }

      await cart.save();
      return res.status(200).json({ message: "Cart updated", cart });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export default createCartItem;
