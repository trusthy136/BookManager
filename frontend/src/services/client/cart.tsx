import axios from "axios";

const API_URL = "http://localhost:5000/api/cart"; // Cập nhật URL API backend của bạn

export interface CartItem {
  product_id: string;
  quantity: number;
}

export interface Cart {
  _id: string;
  customer_id: string;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Lấy giỏ hàng của khách hàng
 * @param customerId ID của khách hàng
 */
export const getCart = async (customerId: string): Promise<Cart> => {
  const response = await axios.get<Cart>(`${API_URL}/${customerId}`);
  return response.data;
};

/**
 * Thêm sản phẩm vào giỏ hàng
 * @param customerId ID của khách hàng
 * @param productId ID của sản phẩm
 * @param quantity Số lượng sản phẩm muốn thêm
 */
export const addToCart = async (
  customerId: string,
  productId: string,
  quantity: number
): Promise<Cart> => {
  const response = await axios.post<Cart>(`${API_URL}/add`, {
    customer_id: customerId,
    product_id: productId,
    quantity,
  });
  return response.data;
};

/**
 * Cập nhật số lượng sản phẩm trong giỏ hàng
 * @param customerId ID của khách hàng
 * @param productId ID của sản phẩm
 * @param quantity Số lượng mới
 */
export const updateCart = async (
  customerId: string,
  productId: string,
  quantity: number
): Promise<Cart> => {
  const response = await axios.put<Cart>(`${API_URL}/update`, {
    customer_id: customerId,
    product_id: productId,
    quantity,
  });
  return response.data;
};

/**
 * Xóa một sản phẩm khỏi giỏ hàng
 * @param customerId ID của khách hàng
 * @param productId ID của sản phẩm cần xóa
 */
export const removeFromCart = async (
  customerId: string,
  productId: string
): Promise<Cart> => {
  const response = await axios.delete<Cart>(`${API_URL}/remove`, {
    data: { customer_id: customerId, product_id: productId },
  });
  return response.data;
};

/**
 * Xóa toàn bộ giỏ hàng của khách hàng
 * @param customerId ID của khách hàng
 */
export const clearCart = async (customerId: string): Promise<Cart> => {
  const response = await axios.delete<Cart>(`${API_URL}/clear/${customerId}`);
  return response.data;
};
