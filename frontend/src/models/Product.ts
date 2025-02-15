export interface Product {
  _id: string;
  product_name: string;
  thumbnail?: string;
  short_description?: string;
  description?: string;
  sell_count: number; // Lượt bán (Nên có giá trị mặc định)
  view: number; // Lượt xem
  price: number; // Giá sản phẩm
  stock: number; // Số lượng trong kho
  images: string[]; // Danh sách URL ảnh
  category_id: string; // Chỉ lưu ID
  author_id: string; // Chỉ lưu ID
  nxb_id: string; // Chỉ lưu ID
  star: string[]; // Danh sách ID đánh giá
  comment: string[]; // Danh sách ID bình luận
  isDeleted: boolean; // Xóa mềm sản phẩm
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  _id: string;
  category_name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NXB {
  _id: string;
  nxb_name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Author {
  _id: string;
  author_name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
