export interface Customer {
  customer_name: string;
  customer_password: string;
  customer_phone: string;
  customer_email: string;
  gender: "Nam" | "Nữ" | "Khác";
  birthday?: Date;
  address: string;
  province?: string;
  district?: string;
  town?: string;
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;
}
