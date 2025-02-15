import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    confimPassword: { type: String, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    address: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["Nam", "Nữ", "Khác"], default: "Khác" },
    birthday: { type: Date },
    avatar: { type: String, default: "default-avatar.png" },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

// Hash mật khẩu trước khi lưu vào database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // const salt = await bcrypt.genSalt(10);
  // this.password = await bcrypt.hash(this.password, salt);
  // next();
});

export default mongoose.model("User", userSchema);
