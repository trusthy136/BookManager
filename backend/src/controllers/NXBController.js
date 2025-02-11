import NXBModel from "../models/NXBModel.js";
import { NXBValid } from "../validations/NXBValid.js";

export const getAllNXB = async (req, res) => {
  try {
    const nxb = await NXBModel.find({}).populate("products");
    if (!(nxb || nxb.length)) {
      return res.status(404).json({ message: "Không tìm thấy nhà xuất bản" });
    }
    return res.status(201).json({
      message: "Lấy nhà xuất bản thành công",
      data: nxb,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getNXBById = async (req, res) => {
  try {
    const nxb = await NXBModel.findById(req.params.id).populate("products");
    if (!nxb) {
      return res.status(404).json({ message: "Không tìm thấy nhà xuất bản" });
    }
    return res.status(201).json({
      message: "Lấy nhà xuất bản thành công",
      data: nxb,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const createNXB = async (req, res) => {
  try {
    const { error } = NXBValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }
    const nxb = await NXBModel.create(req.body);

    return res.status(201).json({
      message: "Tạo nhà xuất bản thành công",
      data: nxb,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const updateNXB = async (req, res) => {
  try {
    const { error } = NXBValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }
    const nxb = await NXBModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!nxb) {
      return res.status(404).json({ message: "Không tìm thấy nhà xuất bản" });
    }
    return res.status(201).json({
      message: "Cập nhật nhà xuất bản thành công",
      data: nxb,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteNXB = async (req, res) => {
  try {
    const nxb = await NXBModel.findByIdAndDelete(req.params.id);
    if (!nxb) {
      return res.status(404).json({ message: "Xóa nhà xuất bản thất bại" });
    }
    return res.status(200).json({
      message: "Xóa nhà xuất bản thành công",
      data: nxb,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
