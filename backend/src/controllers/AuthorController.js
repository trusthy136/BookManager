import AuthorModel from "../models/AuthorModel.js";
import ProductModel from "../models/ProductModel.js";
import { authorValid } from "../validations/AuthorValid.js";

export const getAllAuthor = async (req, res) => {
  try {
    const authors = await AuthorModel.find({})
      .populate("products", "product_name price") // Chỉ lấy trường cần thiết
      .sort({ createdAt: -1 }); // Sắp xếp theo ngày tạo mới nhất

    if (!authors || authors.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy tác giả" });
    }

    return res.status(200).json({
      message: "Lấy danh sách tác giả thành công",
      data: authors,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi xảy ra khi lấy danh sách tác giả",
      error: error.message,
    });
  }
};

import mongoose from "mongoose";

export const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra id có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const author = await AuthorModel.findById(id).populate(
      "products",
      "product_name price thumbnail"
    ); // Chỉ lấy trường cần thiết

    if (!author) {
      return res.status(404).json({ message: "Không tìm thấy tác giả" });
    }

    return res.status(200).json({
      message: "Lấy thông tin tác giả thành công",
      data: author,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi xảy ra khi lấy thông tin tác giả",
      error: error.message,
    });
  }
};

export const createAuthor = async (req, res) => {
  try {
    // Kiểm tra dữ liệu đầu vào
    const { error } = authorValid.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const { author_name } = req.body;

    // Kiểm tra tác giả đã tồn tại chưa
    const existingAuthor = await AuthorModel.findOne({ author_name });
    if (existingAuthor) {
      return res.status(400).json({
        message: "Tên tác giả đã tồn tại",
      });
    }

    // Tạo tác giả mới
    const author = await AuthorModel.create({ author_name });

    return res.status(201).json({
      message: "Tạo tác giả thành công",
      data: author,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi xảy ra khi tạo tác giả",
      error: error.message,
    });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    // Kiểm tra dữ liệu đầu vào
    const { error } = authorValid.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const { author_name } = req.body;
    const authorId = req.params.id;

    // Kiểm tra tác giả có tồn tại không
    const existingAuthor = await AuthorModel.findById(authorId);
    if (!existingAuthor) {
      return res.status(404).json({
        message: "Không tìm thấy tác giả",
      });
    }

    // Kiểm tra tên tác giả đã tồn tại chưa (trừ tác giả đang cập nhật)
    const duplicateAuthor = await AuthorModel.findOne({
      author_name,
      _id: { $ne: authorId },
    });
    if (duplicateAuthor) {
      return res.status(400).json({
        message: "Tên tác giả đã tồn tại",
      });
    }

    // Cập nhật tác giả
    const updatedAuthor = await AuthorModel.findByIdAndUpdate(
      authorId,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      message: "Cập nhật tác giả thành công",
      data: updatedAuthor,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi xảy ra khi cập nhật tác giả",
      error: error.message,
    });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    // Kiểm tra tác giả có tồn tại không
    const existingAuthor = await AuthorModel.findById(authorId);
    if (!existingAuthor) {
      return res.status(404).json({
        message: "Không tìm thấy tác giả",
      });
    }

    // Kiểm tra xem tác giả có sách nào liên quan không
    const booksByAuthor = await ProductModel.findOne({ author_id: authorId });
    if (booksByAuthor) {
      return res.status(400).json({
        message: "Không thể xóa tác giả vì có sách liên quan",
      });
    }

    // Xóa tác giả và lấy thông tin tác giả đã xóa
    const deletedAuthor = await AuthorModel.findByIdAndDelete(authorId);

    return res.status(200).json({
      message: "Xóa tác giả thành công",
      data: deletedAuthor, // Trả về thông tin tác giả đã xóa
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi xảy ra khi xóa tác giả",
      error: error.message,
    });
  }
};
