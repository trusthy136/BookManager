import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import router from "./src/routes/index.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
});
app.use("/api", router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export const viteNodeApp = app;
