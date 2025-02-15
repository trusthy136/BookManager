import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customer_name: { type: String, required: true, trim: true },
    customer_password: { type: String, required: true, trim: true },
    customer_confirmPassword: { type: String, trim: true },
    customer_phone: { type: String, required: true, unique: true, trim: true },
    customer_email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    gender: { type: String, enum: ["Nam", "Nữ", "Khác"], default: "Khác" },
    birthday: { type: Date },
    address: { type: String, required: true, trim: true },
    province: { type: String, trim: true },
    district: { type: String, trim: true },
    town: { type: String, trim: true },
    avatar: { type: String, default: "default-avatar.png" },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Customer", customerSchema);
