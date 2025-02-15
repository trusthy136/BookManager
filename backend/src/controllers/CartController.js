import Cart from "../models/Cart";
import Product from "../models/Product";

export const addToCart = async (req, res) => {
  try {
    const { customer_id, product_id, quantity } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!customer_id || !product_id || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
    }

    // Kiểm tra sản phẩm có tồn tại không
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    // Kiểm tra giỏ hàng của khách hàng
    let cart = await Cart.findOne({ customer_id });

    if (!cart) {
      // Nếu chưa có giỏ hàng, tạo mới
      cart = new Cart({
        customer_id,
        items: [{ product_id, quantity }],
      });
    } else {
      // Nếu đã có giỏ hàng, kiểm tra sản phẩm đã có trong giỏ chưa
      const itemIndex = cart.items.findIndex(
        (item) => item.product_id.toString() === product_id
      );

      if (itemIndex > -1) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Nếu chưa có, thêm mới vào giỏ hàng
        cart.items.push({ product_id, quantity });
      }
    }

    // Lưu giỏ hàng vào database
    await cart.save();

    return res
      .status(200)
      .json({ message: "Thêm vào giỏ hàng thành công", cart });
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
