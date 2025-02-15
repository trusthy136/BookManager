import CustomerModel from "../models/CustomerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Đăng ký khách hàng mới
export const register = async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_password,
      customer_confirmPassword,
      address,
    } = req.body;

    // Kiểm tra email hoặc số điện thoại đã tồn tại chưa
    const existingCustomer = await CustomerModel.findOne({
      $or: [{ customer_email }, { customer_phone }],
    });

    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: "Email hoặc số điện thoại đã được sử dụng" });
    }

    // Kiểm tra xác nhận mật khẩu
    if (customer_password !== customer_confirmPassword) {
      return res.status(400).json({ message: "Mật khẩu xác nhận không khớp" });
    }

    // Hash mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(customer_password, salt);

    // Tạo khách hàng mới
    const newCustomer = new CustomerModel({
      customer_name,
      customer_email,
      customer_phone,
      customer_password: hashedPassword,
      address,
    });

    await newCustomer.save();
    res
      .status(201)
      .json({ message: "Đăng ký thành công", customer: newCustomer });
  } catch (error) {
    console.error("Lỗi đăng ký khách hàng:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Đăng nhập khách hàng
export const login = async (req, res) => {
  try {
    const { customer_email, customer_password } = req.body;

    // Kiểm tra email có tồn tại không
    const customer = await CustomerModel.findOne({ customer_email });
    if (!customer) {
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(
      customer_password,
      customer.customer_password
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    // Tạo token
    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Đăng nhập thành công", token, customer });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy danh sách khách hàng
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await CustomerModel.find().select("-customer_password");
    res.status(200).json(customers);
  } catch (error) {
    console.error("Lỗi lấy danh sách khách hàng:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy thông tin khách hàng theo ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.params.id).select(
      "-customer_password"
    );
    if (!customer) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error("Lỗi lấy thông tin khách hàng:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Cập nhật thông tin khách hàng
export const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-customer_password");

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }

    res
      .status(200)
      .json({ message: "Cập nhật thành công", customer: updatedCustomer });
  } catch (error) {
    console.error("Lỗi cập nhật khách hàng:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xóa khách hàng
export const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await CustomerModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }
    res.status(200).json({ message: "Xóa khách hàng thành công" });
  } catch (error) {
    console.error("Lỗi xóa khách hàng:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
