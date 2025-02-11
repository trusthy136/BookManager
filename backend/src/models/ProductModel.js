import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true, unique: true },
    thumbnail: { type: String },
    short_description: { type: String },
    description: { type: String },
    sell_count: { type: Number, default: 0 },
    view: { type: Number, default: 0 },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 }, // Bổ sung số lượng tồn kho
    image: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gallery" }],
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    nxb_id: { type: mongoose.Schema.Types.ObjectId, ref: "NXB" },
    star: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
