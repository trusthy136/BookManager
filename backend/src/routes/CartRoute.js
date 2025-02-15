import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controllers/CartController.js";

const cartRouter = express.Router();

cartRouter.get("/:customerId", getCart);
cartRouter.post("/add", addToCart);
cartRouter.patch("/update", updateCart);
cartRouter.delete("/remove", removeFromCart);
cartRouter.delete("/clear/:customerId", clearCart);

export default cartRouter;
