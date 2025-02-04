import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    star: { type: Number },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Rating", ratingSchema);
