import axios from "axios";

const API_URL = "http://localhost:5000/api/customers";

export interface Customer {
  _id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address?: string;
}

export interface RegisterData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_password: string;
  customer_confirmPassword: string;
  address?: string;
}

export interface LoginData {
  customer_email: string;
  customer_password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  customer: Customer;
}

// Đăng ký khách hàng
export const registerCustomer = async (data: RegisterData) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

// Đăng nhập khách hàng
export const loginCustomer = async (data: LoginData) => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, data);
  return response.data;
};

// Lấy danh sách khách hàng
export const getAllCustomers = async () => {
  const response = await axios.get<Customer[]>(API_URL);
  return response.data;
};

// Lấy thông tin khách hàng theo ID
export const getCustomerById = async (id: string) => {
  const response = await axios.get<Customer>(`${API_URL}/${id}`);
  return response.data;
};

// Cập nhật thông tin khách hàng
export const updateCustomer = async (id: string, data: Partial<Customer>) => {
  const response = await axios.put<Customer>(`${API_URL}/${id}`, data);
  return response.data;
};

// Xóa khách hàng
export const deleteCustomer = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
