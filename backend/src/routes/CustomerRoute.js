import express from "express";
import {
  register,
  login,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/CustomerController.js";

const customerRouter = express.Router();

// Đăng ký & đăng nhập
customerRouter.post("/register", register);
customerRouter.post("/login", login);

// Lấy danh sách khách hàng & chi tiết khách hàng
customerRouter.get("/", getAllCustomers);
customerRouter.get("/:id", getCustomerById);

// Cập nhật & xóa khách hàng
customerRouter.put("/:id", updateCustomer);
customerRouter.delete("/:id", deleteCustomer);

export default customerRouter;
