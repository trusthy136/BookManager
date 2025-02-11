import CategoryModel from "../models/CategoryModel.js";
import { categoryValid } from "../validations/CategoryValid.js";

export const getAllCategories = async (req, res) => {
  try {
    const category = await CategoryModel.find({}).populate("products");
    if (!(category || category.length)) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
    return res.status(201).json({
      message: "Lấy danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id).populate(
      "products"
    );
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
    return res.status(201).json({
      message: "Lấy danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { error } = categoryValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }

    const category = await CategoryModel.create(req.body);

    return res.status(201).json({
      message: "Tạo danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { error } = categoryValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(500).json({
        message: errors,
      });
    }
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Cập nhật danh mục thất bại" });
    }
    return res.status(200).json({
      message: "Cập nhật danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Xóa danh mục thất bại" });
    }
    return res.status(200).json({
      message: "Xóa danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
