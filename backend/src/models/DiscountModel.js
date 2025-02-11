import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    discount: { type: Number, required: true, min: 0 },
    start_date: { type: Date, required: true },
    exp_date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.start_date;
        },
        message: "Ngày hết hạn phải lớn hơn ngày bắt đầu!",
      },
    },
    usage_limit: { type: Number, min: 0, default: null },
    view: { type: Number, min: 0, default: 0 },
    minimum_order_value: { type: Number, min: 0, default: null },
    max_discount: { type: Number, min: 0, default: null },
    customers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }], // Danh sách khách hàng có thể sử dụng mã này
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Discount", discountSchema);
