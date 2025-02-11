import { Router } from "express";
import {
  createNXB,
  deleteNXB,
  getAllNXB,
  getNXBById,
  updateNXB,
} from "../controllers/NXBController.js";

const nxbRouter = Router();
nxbRouter.get("/", getAllNXB);
nxbRouter.get("/:id", getNXBById);
nxbRouter.post("/", createNXB);
nxbRouter.put("/:id", updateNXB);
nxbRouter.delete("/:id", deleteNXB);

export default nxbRouter;
