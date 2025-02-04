import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    gender: { type: String, enum: ["Nam", "Nữ", "Khác"] },
    birthday: { type: Date },
    avatar: { type: String },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("User", userSchema);
