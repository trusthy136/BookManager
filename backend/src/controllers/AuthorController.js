import AuthorModel from "../models/AuthorModel.js";

export const getAllAuhor = async (req, res) => {
  try {
    const author = await AuthorModel.find({}).populate("products");
    if (!(author || author.length)) {
      return res.status(404).json({ message: "Không tìm thấy tác giả" });
    }
    return res.status(200).json({
      message: "Lấy tác giả thành công",
      data: author,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await AuthorModel.findById(req.params.id).populate(
      "products"
    );
    if (!author) {
      return res.status(404).json({ message: "Không tìm thấy tác giả" });
    }
    return res.status(200).json({
      message: "Lấy tác giả thành công",
      data: author,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const { error } = authorValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const author = await AuthorModel.create(req.body);

    return res.status(201).json({
      message: "Tạo tác giả thành công",
      data: author,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const { error } = authorValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const author = await AuthorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(201).json({
      message: "Cập nhật tác giả thành công",
      data: author,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const author = await AuthorModel.findByIdAndDelete(req.params.id);
    return res.status(201).json({
      message: "Xóa tác giả thành công",
      data: author,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
