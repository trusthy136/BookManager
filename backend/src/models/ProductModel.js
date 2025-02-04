import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    short_description: { type: String, required: true },
    description: { type: String, required: true },
    sell_count: { type: Number },
    view: { type: Number },
    price: { type: Number, required: true },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Gallery" },
    category_name: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    author_name: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    nxb_name: { type: mongoose.Schema.Types.ObjectId, ref: "NXB" },
    star: { type: mongoose.Schema.Types.ObjectId, ref: "Rating" },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Product", productSchema);
