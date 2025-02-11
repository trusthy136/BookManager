import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    }, // Người đánh giá
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    }, // Sản phẩm được đánh giá
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    }, // Đánh giá có thể liên kết với đơn hàng
    star: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: "Số sao phải là số nguyên từ 1 đến 5!",
      },
    },
    comment: { type: String, trim: true }, // Nhận xét của khách hàng
    images: [{ type: String }], // Ảnh đánh giá (nếu có)
    is_approved: { type: Boolean, default: false }, // Đánh giá có cần duyệt trước khi hiển thị không?
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Rating", ratingSchema);
