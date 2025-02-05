import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      defaultValue: "Chưa có danh mục",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Category", categorySchema);
