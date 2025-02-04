import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer_name: { type: String, required: true },
    order_code: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "Chờ xử lý",
        "Đã xác nhận",
        "Đang giao hàng",
        "Đã giao hàng",
        "Hoàn thành",
        "Hủy",
      ],
    },
    shippingFee: { type: Number, required: true },
    status_payment: {
      type: String,
      enum: ["Chưa thanh toán", "Đã thanh toán"],
    },
    code: { type: mongoose.Schema.Types.ObjectId, ref: "Discount" },
    discount: { type: mongoose.Schema.Types.ObjectId, ref: "Discount" },
    total_after_discount: { type: Number },
    payment_method: {
      type: String,
      enum: ["COD", "Momo", "ZaloPay", "Banking"],
    },
    note: { type: String },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Order", orderSchema);
