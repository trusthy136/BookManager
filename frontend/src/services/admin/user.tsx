import instance from "../../apis/api";
import { User } from "../../models/User";

// Lấy danh sách tất cả người dùng
export const getAllUsers = async () => {
  try {
    const response = await instance.get("users");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    throw error;
  }
};

// Lấy thông tin chi tiết người dùng theo ID
export const getUserById = async (id: string) => {
  try {
    const response = await instance.get(`users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    throw error;
  }
};

// Tạo tài khoản người dùng mới
export const createUser = async (userData: User) => {
  try {
    const response = await instance.post("users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo người dùng:", error);
    throw error;
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (id: string, userData: User) => {
  try {
    const response = await instance.put(`users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    throw error;
  }
};

// Xóa mềm người dùng
export const deleteUser = async (id: string) => {
  try {
    const response = await instance.delete(`users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    throw error;
  }
};
