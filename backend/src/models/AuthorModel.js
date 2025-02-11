import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    author_name: {
      type: String,
      required: true,
      unique: true, // Không cho phép trùng lặp
      trim: true, // Loại bỏ khoảng trắng thừa
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

export default mongoose.model("Author", authorSchema);
