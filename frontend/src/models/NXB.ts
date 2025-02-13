export interface NXB {
  nxb_name: string;
  products: string[]; // Danh sách ID của Product
  createdAt?: Date;
  updatedAt?: Date;
}
