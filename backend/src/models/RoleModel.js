import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      enum: ["admin", "user", "saler"],
      default: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Role", roleSchema);
