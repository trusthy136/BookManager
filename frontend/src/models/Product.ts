export interface Product {
  _id: string;
  product_name: string;
  thumbnail?: string;
  short_description?: string;
  description?: string;
  sell_count: number;
  view: number;
  price: number;
  stock: number;
  images: string[]; // Danh sách URL ảnh hoặc ID của ảnh trong Gallery
  category_id: Category; // Một danh mục duy nhất (Nếu có nhiều thì để Category[])
  author_id: Author; // Một tác giả duy nhất
  nxb_id: NXB; // Một nhà xuất bản duy nhất
  star: string[]; // Danh sách ID của Rating
  comment: string[]; // Danh sách ID của Comment
  isDeleted: boolean;
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
