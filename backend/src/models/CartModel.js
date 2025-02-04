import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Cart", cartSchema);
