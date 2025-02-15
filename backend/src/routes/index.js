import { Router } from "express";
import categoryRouter from "./CategoryRoute.js";
import authorRouter from "./AuthorRoute.js";
import nxbRouter from "./NXBRoute.js";
import productRouter from "./ProductRoute.js";
import userRouter from "./UserRoute.js";
import customerRouter from "./CustomerRoute.js";
import roleRouter from "./RoleRoute.js";

const router = Router();
router.use("/categories", categoryRouter);
router.use("/authors", authorRouter);
router.use("/nxb", nxbRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/customers", customerRouter);
router.use("/roles", roleRouter);

export default router;
