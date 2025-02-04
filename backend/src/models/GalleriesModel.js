import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    image_path: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Gallery", gallerySchema);
