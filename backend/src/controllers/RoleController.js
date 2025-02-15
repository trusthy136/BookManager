import RoleModel from "../models/RoleModel.js";

// Lấy danh sách tất cả các vai trò
export const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Lấy vai trò theo ID
export const getRoleById = async (req, res) => {
  try {
    const role = await RoleModel.findById(req.params.id);
    if (!role)
      return res.status(404).json({ message: "Vai trò không tồn tại" });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Tạo vai trò mới
export const createRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role)
      return res.status(400).json({ message: "Vai trò không được để trống" });

    const newRole = new RoleModel({ role });
    await newRole.save();
    res.status(201).json({ message: "Vai trò đã được tạo", newRole });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Cập nhật vai trò
export const updateRole = async (req, res) => {
  try {
    const { role } = req.body;
    const updatedRole = await RoleModel.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    if (!updatedRole)
      return res.status(404).json({ message: "Vai trò không tồn tại" });
    res.status(200).json({ message: "Vai trò đã được cập nhật", updatedRole });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Xóa vai trò
export const deleteRole = async (req, res) => {
  try {
    const deletedRole = await RoleModel.findByIdAndDelete(req.params.id);
    if (!deletedRole)
      return res.status(404).json({ message: "Vai trò không tồn tại" });
    res.status(200).json({ message: "Vai trò đã bị xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};
