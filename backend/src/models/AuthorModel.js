import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    author_name: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Author", authorSchema);
