import instance from "../../apis/api";
import { Product } from "../../models/Product";

// Lấy danh sách sản phẩm (lọc sản phẩm chưa bị xóa mềm)
export const getAllProduct = async () => {
  try {
    const { data } = await instance.get("products", {
      params: { isDeleted: false },
    });
    return data;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách sản phẩm:", error);
  }
};

// Lấy thông tin chi tiết sản phẩm theo ID
export const getProductById = async (id: string | number) => {
  try {
    const { data } = await instance.get(`products/${id}`);
    return data;
  } catch (error) {
    console.log("Lỗi khi lấy thông tin sản phẩm:", error);
  }
};

// Tạo mới một sản phẩm
export const createProduct = async (product: Product) => {
  try {
    const { data } = await instance.post("products", product);
    return data;
  } catch (error) {
    console.log("Lỗi khi tạo sản phẩm:", error);
  }
};

// Cập nhật thông tin sản phẩm
export const updateProduct = async (id: string | number, product: Product) => {
  try {
    const { data } = await instance.put(`products/${id}`, product);
    return data;
  } catch (error) {
    console.log("Lỗi khi cập nhật sản phẩm:", error);
  }
};

// Xóa sản phẩm (xóa mềm bằng cách cập nhật isDeleted = true)
export const deleteProduct = async (id: string | number) => {
  try {
    const { data } = await instance.put(`products/${id}`, { isDeleted: true });
    return data;
  } catch (error) {
    console.log("Lỗi khi xóa sản phẩm:", error);
  }
};
