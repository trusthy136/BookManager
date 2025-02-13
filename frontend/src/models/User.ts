export interface User {
  username: string;
  password: string;
  phone: string;
  email: string;
  address: string;
  gender: "Nam" | "Nữ" | "Khác";
  birthday?: Date;
  avatar: string;
  role: string; // ID của Role
  createdAt?: Date;
  updatedAt?: Date;
}
