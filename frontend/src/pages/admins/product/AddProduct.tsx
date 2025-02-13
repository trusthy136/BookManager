import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../services/admin/product";

const AddProduct = () => {
  const [product, setProduct] = useState({
    product_name: "",
    short_description: "",
    price: "",
    thumbnail: "",
    category_id: "",
    author_id: "",
    nxb_id: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProduct(product);
      alert("Thêm sản phẩm thành công!");
      navigate("/admin/product");
    } catch (error) {
      alert("Lỗi khi thêm sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-decoration-underline">Thêm Sản Phẩm</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            name="product_name"
            className="form-control"
            value={product.product_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mô tả ngắn</label>
          <textarea
            name="short_description"
            className="form-control"
            value={product.short_description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Giá</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ảnh</label>
          <input
            type="text"
            name="thumbnail"
            className="form-control"
            value={product.thumbnail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Đang thêm..." : "Thêm Sản Phẩm"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/product")}
          >
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
