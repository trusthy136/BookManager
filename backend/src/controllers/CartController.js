import CartModel from "../models/CartModel.js";
import ProductModel from "../models/ProductModel.js";

/**
 * Lấy giỏ hàng của khách hàng
 */
export const getCart = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Kiểm tra giỏ hàng của khách hàng
    const cart = await CartModel.findOne({ customer_id: customerId }).populate(
      "items.product_id"
    );

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng trống." });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * Thêm sản phẩm vào giỏ hàng
 */
export const addToCart = async (req, res) => {
  try {
    const { customer_id, product_id, quantity } = req.body;

    if (!customer_id || !product_id || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
    }

    const product = await ProductModel.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Số lượng sản phẩm trong kho không đủ. Chỉ còn ${product.stock} sản phẩm.`,
      });
    }

    let cart = await CartModel.findOne({ customer_id });

    if (!cart) {
      cart = new CartModel({ customer_id, items: [{ product_id, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product_id.toString() === product_id
      );

      if (itemIndex > -1) {
        const newQuantity = cart.items[itemIndex].quantity + quantity;

        if (newQuantity > product.stock) {
          return res.status(400).json({
            message: `Bạn không thể thêm quá ${product.stock} sản phẩm vào giỏ.`,
          });
        }

        cart.items[itemIndex].quantity = newQuantity;
      } else {
        cart.items.push({ product_id, quantity });
      }
    }

    await cart.save();

    return res
      .status(200)
      .json({ message: "Thêm vào giỏ hàng thành công", cart });
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * Cập nhật số lượng sản phẩm trong giỏ hàng
 */
export const updateCart = async (req, res) => {
  try {
    const { customer_id, product_id, quantity } = req.body;

    if (
      !customer_id ||
      !product_id ||
      quantity === undefined ||
      quantity <= 0
    ) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
    }

    const product = await ProductModel.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    let cart = await CartModel.findOne({ customer_id });

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product_id.toString() === product_id
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "Sản phẩm không có trong giỏ hàng" });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Không thể cập nhật số lượng quá ${product.stock} sản phẩm.`,
      });
    }

    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    return res
      .status(200)
      .json({ message: "Cập nhật giỏ hàng thành công", cart });
  } catch (error) {
    console.error("Lỗi khi cập nhật giỏ hàng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * Xóa một sản phẩm khỏi giỏ hàng
 */
export const removeFromCart = async (req, res) => {
  try {
    const { customer_id, product_id } = req.body;

    if (!customer_id || !product_id) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
    }

    let cart = await CartModel.findOne({ customer_id });

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    cart.items = cart.items.filter(
      (item) => item.product_id.toString() !== product_id
    );

    await cart.save();

    return res
      .status(200)
      .json({ message: "Xóa sản phẩm khỏi giỏ hàng thành công", cart });
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * Xóa toàn bộ giỏ hàng của khách hàng
 */
export const clearCart = async (req, res) => {
  try {
    const { customerId } = req.params;

    const cart = await CartModel.findOne({ customer_id: customerId });

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    cart.items = [];
    await cart.save();

    return res.status(200).json({ message: "Giỏ hàng đã được xóa sạch", cart });
  } catch (error) {
    console.error("Lỗi khi xóa toàn bộ giỏ hàng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
