import instance from "../../apis/api";
import { User } from "../../models/User";

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

// Đăng ký tài khoản
export const register = async (userData: User) => {
  try {
    const response = await instance.post("/users/register", userData);
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi đăng ký:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Đăng nhập
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await instance.post("/users/login", {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi đăng nhập:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
