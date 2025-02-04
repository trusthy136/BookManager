import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customer_name: { type: String, required: true },
    customer_phone: { type: String, required: true },
    address: { type: String, required: true },
    province: { type: String },
    district: { type: String },
    town: { type: String },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Customer", customerSchema);
