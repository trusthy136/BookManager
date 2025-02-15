import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      enum: ["Admin", "User", "Saler"],
      default: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Role", roleSchema);
