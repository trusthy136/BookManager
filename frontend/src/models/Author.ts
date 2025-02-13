export interface Author {
  author_name: string;
  products: string[]; // Danh sách ID của Product
  createdAt?: Date;
  updatedAt?: Date;
}
