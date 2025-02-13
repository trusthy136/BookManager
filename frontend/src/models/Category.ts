export interface Category {
  _id: string;
  category_name: string;
  products: string[]; // Danh sách ID của Product
  createdAt?: Date;
  updatedAt?: Date;
}
