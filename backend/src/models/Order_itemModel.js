import mongoose from "mongoose";

const order_itemSchema = new mongoose.Schema(
  {
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    product_name: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    author_name: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    nxb_name: { type: mongoose.Schema.Types.ObjectId, ref: "NXB" },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Order_item", order_itemSchema);
