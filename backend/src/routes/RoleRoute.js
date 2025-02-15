import express from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleById,
  updateRole,
} from "../controllers/RoleController.js";
const roleRouter = express.Router();

roleRouter.get("/", getAllRoles);
roleRouter.get("/:id", getRoleById);
roleRouter.post("/", createRole);
roleRouter.patch("/:id", updateRole);
roleRouter.delete("/:id", deleteRole);

export default roleRouter;
