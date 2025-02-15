import AuthorModel from "../models/AuthorModel.js";
import CategoryModel from "../models/CategoryModel.js";
import NXBModel from "../models/NXBModel.js";
import ProductModel from "../models/ProductModel.js";

export const getAllProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category_id", "category_name") // Lấy thông tin danh mục (chỉ lấy category_name)
      .populate("author_id", "author_name") // Lấy thông tin tác giả (chỉ lấy author_name)
      .populate("nxb_id", "nxb_name") // Lấy thông tin nhà xuất bản (chỉ lấy nxb_name)
      .lean(); // Tối ưu hiệu suất

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    return res.status(200).json({
      message: "Lấy danh sách sản phẩm thành công",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi xảy ra khi lấy danh sách sản phẩm",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id)
      .populate("category_id", "category_name") // Lấy thông tin danh mục (chỉ lấy category_name)
      .populate("author_id", "author_name") // Lấy thông tin tác giả (chỉ lấy author_name)
      .populate("nxb_id", "nxb_name") // Lấy thông tin nhà xuất bản (chỉ lấy nxb_name)
      .lean(); // Tối ưu hiệu suất

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    return res.status(200).json({
      message: "Lấy thông tin sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi xảy ra khi lấy thông tin sản phẩm",
      error: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { product_name, price, categoryId, authorId, nxbId } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!product_name || !price) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin sản phẩm",
      });
    }

    // Kiểm tra xem categoryId, authorId, nxbId có hợp lệ không (nếu có)
    const category = categoryId
      ? await CategoryModel.findById(categoryId)
      : null;
    const author = authorId ? await AuthorModel.findById(authorId) : null;
    const nxb = nxbId ? await NXBModel.findById(nxbId) : null;

    if (categoryId && !category) {
      return res.status(400).json({ message: "Danh mục không hợp lệ" });
    }
    if (authorId && !author) {
      return res.status(400).json({ message: "Tác giả không hợp lệ" });
    }
    if (nxbId && !nxb) {
      return res.status(400).json({ message: "Nhà xuất bản không hợp lệ" });
    }

    // Tạo sản phẩm mới
    const product = await ProductModel.create(req.body);
    if (!product) {
      return res.status(500).json({
        message: "Tạo sản phẩm không thành công",
      });
    }

    return res.status(201).json({
      message: "Tạo sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi xảy ra khi tạo sản phẩm",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { categoryId, authorId, nxbId, ...updateData } = req.body;

    // Lấy thông tin sản phẩm trước khi cập nhật
    const oldProduct = await ProductModel.findById(req.params.id);
    if (!oldProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    // Cập nhật sản phẩm
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { categoryId, authorId, nxbId, ...updateData },
      { new: true }
    );

    if (!product) {
      return res.status(400).json({ message: "Cập nhật sản phẩm thất bại" });
    }

    // Danh mục thay đổi
    const updateCategory =
      categoryId && oldProduct.categoryId?.toString() !== categoryId.toString()
        ? [
            CategoryModel.findByIdAndUpdate(oldProduct.categoryId, {
              $pull: { products: product._id },
            }),
            CategoryModel.findByIdAndUpdate(categoryId, {
              $push: { products: product._id },
            }),
          ]
        : [];

    // Tác giả thay đổi
    const updateAuthor =
      authorId && oldProduct.authorId?.toString() !== authorId.toString()
        ? [
            AuthorModel.findByIdAndUpdate(oldProduct.authorId, {
              $pull: { products: product._id },
            }),
            AuthorModel.findByIdAndUpdate(authorId, {
              $push: { products: product._id },
            }),
          ]
        : [];

    // Nhà xuất bản thay đổi
    const updateNXB =
      nxbId && oldProduct.nxbId?.toString() !== nxbId.toString()
        ? [
            NXBModel.findByIdAndUpdate(oldProduct.nxbId, {
              $pull: { products: product._id },
            }),
            NXBModel.findByIdAndUpdate(nxbId, {
              $push: { products: product._id },
            }),
          ]
        : [];

    // Chạy song song các cập nhật
    await Promise.all([...updateCategory, ...updateAuthor, ...updateNXB]);

    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi xảy ra khi cập nhật sản phẩm",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    // Kiểm tra nếu sản phẩm không tồn tại
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    // Xóa mềm bằng cách cập nhật trạng thái `isDeleted`
    product.isDeleted = true;
    await product.save();

    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi xảy ra khi xóa sản phẩm",
      error: error.message,
    });
  }
};
