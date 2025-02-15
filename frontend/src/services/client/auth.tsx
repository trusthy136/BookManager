import instance from "../../apis/api";
import { User } from "../../models/User";

// Đăng ký tài khoản
export const registerUser = async (userData: User) => {
  try {
    const response = await instance.post(`/register`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Lỗi đăng ký tài khoản!";
  }
};

// Đăng nhập
export const login = async (loginData: User) => {
  try {
    const response = await instance.post(`/login`, loginData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Lỗi đăng nhập!";
  }
};
