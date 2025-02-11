import mongoose from "mongoose";

const nxbSchema = new mongoose.Schema(
  {
    nxb_name: {
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

export default mongoose.model("NXB", nxbSchema);
