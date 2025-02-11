import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    image_path: { type: String, required: true }, // Đường dẫn hoặc URL ảnh

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },

    image_type: {
      type: String,
      enum: ["product", "banner", "other"],
      default: "other",
    }, // Loại ảnh
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Gallery", gallerySchema);
