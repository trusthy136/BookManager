import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAllAuhor,
  getAuthorById,
  updateAuthor,
} from "../controllers/AuthorController";

const authorRouter = Router();
authorRouter.get("/", getAllAuhor);
authorRouter.get("/:id", getAuthorById);
authorRouter.post("/", createAuthor);
authorRouter.put("/:id", updateAuthor);
authorRouter.delete("/:id", deleteAuthor);

export default authorRouter;
