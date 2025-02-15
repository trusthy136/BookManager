import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProduct } from "../../services/admin/product";
import { getCategories } from "../../services/admin/category";
import { getAllNXB } from "../../services/admin/nxb";
import { Product } from "../../models/Product";

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<
    { _id: string; category_name: string }[]
  >([]);
  const [authors, setAuthors] = useState<
    { _id: string; author_name: string }[]
  >([]);
  const [nxbs, setNXBs] = useState<{ _id: string; nxb_name: string }[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedNXB, setSelectedNXB] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getAllProduct();
        const categoryData = await getCategories();
        const authorData = await getAllProduct();
        const nxbData = await getAllNXB();

        if (productData) setProducts(productData.data);
        if (categoryData) setCategories(categoryData.data);
        if (authorData) setAuthors(authorData.data);
        if (nxbData) setNXBs(nxbData.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  // Lọc sản phẩm theo category, author, nxb
  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === "" ||
        product.category_id._id === selectedCategory) &&
      (selectedAuthor === "" || product.author_id._id === selectedAuthor) &&
      (selectedNXB === "" || product.nxb_id._id === selectedNXB)
    );
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Tất Cả Sản Phẩm</h2>

      {/* Bộ lọc */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label className="form-label">Chọn Danh Mục</label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tất cả</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Chọn Tác Giả</label>
          <select
            className="form-select"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">Tất cả</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.author_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Chọn Nhà Xuất Bản</label>
          <select
            className="form-select"
            value={selectedNXB}
            onChange={(e) => setSelectedNXB(e.target.value)}
          >
            <option value="">Tất cả</option>
            {nxbs.map((nxb) => (
              <option key={nxb._id} value={nxb._id}>
                {nxb.nxb_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-md-3 mb-4" key={product._id}>
              <div className="card">
                <img
                  src={
                    product.thumbnail || "https://via.placeholder.com/200x250"
                  }
                  className="card-img-top"
                  alt={product.product_name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.product_name}</h5>
                  <p className="card-text text-danger">
                    Giá: {product.price.toLocaleString()}đ
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    className="btn btn-primary"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
