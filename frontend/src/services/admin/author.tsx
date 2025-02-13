import instance from "../../apis/api";
import { Author } from "../../models/Product";

export const getAuthors = async () => {
  try {
    const response = await instance.get("authors");
    return response.data; // Trả về `data` trực tiếp
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tác giả:", error);
    return { success: false, message: "Không thể tải danh sách tác giả." };
  }
};

export const getAuthorById = async (id: string | number) => {
  try {
    const response = await instance.get(`authors/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin tác giả:", error);
    return { success: false, message: "Không tìm thấy tác giả." };
  }
};

export const createAuthor = async (author: Author) => {
  try {
    const response = await instance.post("authors", author);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm tác giả:", error);
    return { success: false, message: "Không thể thêm tác giả." };
  }
};

export const updateAuthor = async (id: string | number, author: Author) => {
  try {
    const response = await instance.put(`authors/${id}`, author);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật tác giả:", error);
    return { success: false, message: "Không thể cập nhật tác giả." };
  }
};

export const deleteAuthor = async (id: string | number) => {
  try {
    const response = await instance.delete(`authors/${id}`);
    if (response.status === 200) {
      return { success: true, message: "Xóa tác giả thành công!" };
    }
  } catch (error) {
    console.error("Lỗi khi xóa tác giả:", error);
  }
  return { success: false, message: "Không thể xóa tác giả." };
};
