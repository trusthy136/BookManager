import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../../services/admin/product";
import { getAllNXB } from "../../../services/admin/nxb";
import { getCategories } from "../../../services/admin/category";
import { getAuthors } from "../../../services/admin/author";
import { Author, Category, NXB } from "../../../models/Product";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    product_name: "",
    thumbnail: "",
    short_description: "",
    description: "",
    sell_count: 0,
    view: 0,
    price: 0,
    stock: 1,
    images: [],
    category_id: "",
    author_id: "",
    nxb_id: "",
    star: [],
    comment: [],
    isDeleted: false,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [nxbs, setNxbs] = useState<NXB[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const productData = await getProductById(id);
      setProduct({
        ...productData,
        product_name: productData.data.product_name || "",
        price: productData.data.price || 0,
        stock: productData.data.stock || 1,
        category_id: productData.data.category_id?._id || "",
        author_id: productData.data.author_id?._id || "",
        nxb_id: productData.data.nxb_id?._id || "",
      });
      const categoryData = await getCategories();
      const authorData = await getAuthors();
      const nxbData = await getAllNXB();
      setCategories(categoryData.data);
      setAuthors(authorData.data);
      setNxbs(nxbData.data);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Kiểm tra dữ liệu đầu vào hợp lệ
    if (
      !product.product_name.trim() ||
      product.price <= 0 ||
      product.stock < 0
    ) {
      setError("Vui lòng nhập đầy đủ và chính xác thông tin sản phẩm.");
      return;
    }

    try {
      await updateProduct(id, product);
      alert("Cập nhật sản phẩm thành công!");
      navigate("/admin/product");
    } catch (error) {
      setError("Cập nhật sản phẩm thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center text-decoration-underline">
        Chỉnh Sửa Sản Phẩm
      </h3>
      <form onSubmit={handleSubmit} className="w-50 mx-auto mt-4">
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm:</label>
          <input
            type="text"
            className="form-control"
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Giá:</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Số lượng:</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Danh mục:</label>
          <select
            className="form-select"
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Tác giả:</label>
          <select
            className="form-select"
            name="author_id"
            value={product.author_id}
            onChange={handleChange}
          >
            <option value="">Chọn tác giả</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.author_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Nhà xuất bản:</label>
          <select
            className="form-select"
            name="nxb_id"
            value={product.nxb_id}
            onChange={handleChange}
          >
            <option value="">Chọn NXB</option>
            {nxbs.map((nxb) => (
              <option key={nxb._id} value={nxb._id}>
                {nxb.nxb_name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-danger">{error}</p>}

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Cập Nhật
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

export default EditProduct;
