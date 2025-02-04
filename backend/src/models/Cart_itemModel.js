import mongoose from "mongoose";

const cart_itemSchema = new mongoose.Schema(
  {
    cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    quantity: { type: Number, required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Cart_item", cart_itemSchema);
