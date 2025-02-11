import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Tham chiếu đến User
    customer_name: { type: String, required: true }, // Lưu tên khách hàng tránh mất dữ liệu khi User bị xóa

    order_code: { type: String, required: true, unique: true }, // Mã đơn hàng duy nhất

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
      default: "Chờ xử lý",
    },

    status_payment: {
      type: String,
      enum: ["Chưa thanh toán", "Đã thanh toán"],
      default: "Chưa thanh toán",
    },

    shippingFee: { type: Number, required: true, default: 0 }, // Phí vận chuyển mặc định là 0

    discount: { type: mongoose.Schema.Types.ObjectId, ref: "Discount" }, // Mã giảm giá
    total_price: { type: Number, required: true }, // Tổng tiền trước giảm giá
    total_after_discount: { type: Number, required: true }, // Tổng tiền sau khi áp dụng giảm giá

    payment_method: {
      type: String,
      enum: ["COD", "Momo", "ZaloPay", "Banking"],
      required: true,
    },

    note: { type: String },

    order_items: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }], // Danh sách sản phẩm trong đơn hàng
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Order", orderSchema);
