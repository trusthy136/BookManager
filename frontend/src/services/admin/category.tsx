import instance from "../../apis/api";
import { Category } from "../../models/Category";

// Lấy danh sách danh mục
export const getCategories = async () => {
  try {
    const { data } = await instance.get("categories");
    return data;
  } catch (error: any) {
    console.error("Lỗi khi lấy danh mục:", error.response?.data || error);
    return null;
  }
};

// Lấy danh mục theo ID
export const getCategoryById = async (id: string | number) => {
  try {
    const response = await instance.get(`categories/${id}`);
    return response.data; // Chỉ trả về `data`
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
    return null;
  }
};

// Thêm mới danh mục
export const createCategory = async (category: Category) => {
  try {
    const { data } = await instance.post("categories", category);
    return data;
  } catch (error: any) {
    console.error("Lỗi khi tạo danh mục:", error.response?.data || error);
    return null;
  }
};

// Cập nhật danh mục
export const updateCategory = async (
  id: string | number,
  category: Category
) => {
  try {
    const { data } = await instance.put(`categories/${id}`, category);
    return data;
  } catch (error: any) {
    console.error(
      `Lỗi khi cập nhật danh mục ID ${id}:`,
      error.response?.data || error
    );
    return null;
  }
};

// Xóa danh mục
export const deleteCategory = async (id: string | number) => {
  try {
    const response = await instance.delete(`categories/${id}`);
    if (response.status === 200) {
      return { success: true, message: "Xóa danh mục thành công!" };
    }
    return { success: false, message: "Không thể xóa danh mục!" };
  } catch (error: any) {
    console.error(
      `Lỗi khi xóa danh mục ID ${id}:`,
      error.response?.data || error
    );
    return { success: false, message: "Lỗi server khi xóa danh mục!" };
  }
};
