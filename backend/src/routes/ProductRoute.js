import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controllers/ProductController.js";

const productRouter = Router();
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductById);
productRouter.post("/", createProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
