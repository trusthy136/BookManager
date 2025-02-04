import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    start_date: { type: Date, required: true },
    exp_date: { type: Date, required: true },
    usage_limit: { type: Number },
    view: { type: Number },
    minimum_order_value: { type: Number },
    max_discount: { type: Number },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Discount", discountSchema);
