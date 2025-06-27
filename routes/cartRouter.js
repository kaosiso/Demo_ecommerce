import { Router } from "express";
import {
  createCartItem,
  // getCartItems,
  // editCartItem,
  // deleteCartItem,
} from "../controller/cartApis/index.js";
import authMiddleware from "../middleware/auth.middleware.js";

const cartRouter = Router();

cartRouter
  .post("/create/:id", authMiddleware, createCartItem)

  // .get("/products", getAllProducts)
  // .get("/usersByquery", authMiddleware, getByqueryParams)
 
  // .put("/product/update/:id", authMiddleware, editProduct)

  // .delete("/product/delete/:id", authMiddleware, deleteProduct);

export default cartRouter;

