import { Router } from "express";
import categoryRouter from "./CategoryRoute.js";

const router = Router();
router.use("/categories", categoryRouter);

export default router;
