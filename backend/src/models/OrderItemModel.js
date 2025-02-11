import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    product_name: { type: String, required: true }, // Lưu trực tiếp tên sản phẩm
    author_name: { type: String, required: true }, // Lưu trực tiếp tên tác giả
    nxb_name: { type: String, required: true }, // Lưu trực tiếp tên NXB
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("OrderItem", orderItemSchema);
