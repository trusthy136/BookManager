import { Router } from "express";
import categoryRouter from "./CategoryRoute.js";
import authorRouter from "./AuthorRoute.js";
import nxbRouter from "./NXBRoute.js";
import productRouter from "./ProductRoute.js";

const router = Router();
router.use("/categories", categoryRouter);
router.use("/authors", authorRouter);
router.use("/nxb", nxbRouter);
router.use("/products", productRouter);

export default router;
