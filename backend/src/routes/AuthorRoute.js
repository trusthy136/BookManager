import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthor,
  getAuthorById,
  updateAuthor,
} from "../controllers/AuthorController.js";

const authorRouter = Router();
authorRouter.get("/", getAllAuthor);
authorRouter.get("/:id", getAuthorById);
authorRouter.post("/", createAuthor);
authorRouter.put("/:id", updateAuthor);
authorRouter.delete("/:id", deleteAuthor);

export default authorRouter;
