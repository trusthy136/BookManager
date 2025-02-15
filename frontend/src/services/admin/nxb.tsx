import instance from "../../apis/api";
import { NXB } from "../../models/Product";

export const getAllNXB = async () => {
  try {
    const response = await instance.get("nxb");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách nhà xuất bản:", error);
    return { success: false, message: "Không thể tải danh sách nhà xuất bản." };
  }
};

export const getNXBById = async (id: string | number) => {
  try {
    const response = await instance.get(`nxb/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin nhà xuất bản:", error);
    return { success: false, message: "Không tìm thấy nhà xuất bản." };
  }
};

export const createNXB = async (nxb: NXB) => {
  try {
    const response = await instance.post("nxb", nxb);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm nhà xuất bản:", error);
    return { success: false, message: "Không thể thêm nhà xuất bản." };
  }
};

export const updateNXB = async (id: string | number, nxb: NXB) => {
  try {
    const response = await instance.put(`nxb/${id}`, nxb);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật nhà xuất bản:", error);
    return { success: false, message: "Không thể cập nhật nhà xuất bản." };
  }
};

export const deleteNXB = async (id: string | number) => {
  try {
    const response = await instance.delete(`nxb/${id}`);
    if (response.status === 200) {
      return { success: true, message: "Xóa nhà xuất bản thành công!" };
    }
  } catch (error) {
    console.error("Lỗi khi xóa nhà xuất bản:", error);
  }
  return { success: false, message: "Không thể xóa nhà xuất bản." };
};
