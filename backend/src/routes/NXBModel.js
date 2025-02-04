import mongoose from "mongoose";

const nxbSchema = new mongoose.Schema(
  {
    nxb_name: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("NXB", nxbSchema);
