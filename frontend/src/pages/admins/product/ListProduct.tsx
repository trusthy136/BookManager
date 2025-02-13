import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { Product } from "../../../models/Product";
import { deleteProduct, getAllProduct } from "../../../services/admin/product";

const ListProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProduct();
        setProducts((data as { data: Product[] }).data);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        alert("Lỗi khi xóa sản phẩm!");
      }
    }
  };

  if (loading)
    return <p className="text-center mt-4">Đang tải danh sách sản phẩm...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-3">
        <IoHomeOutline className="me-2" />
        <GrFormNext className="me-2" />
        <h3 className="text-decoration-underline mb-0">Quản lý sản phẩm</h3>
      </div>

      {/* Nút thêm sản phẩm */}
      <div className="mb-4">
        <Link to="/admin/product-add" className="btn btn-primary">
          Thêm Sản Phẩm Mới
        </Link>
      </div>

      {/* Bảng danh sách sản phẩm */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Tên sản phẩm</th>
              <th className="text-center">Mô tả ngắn</th>
              <th className="text-center">Giá</th>
              <th className="text-center">Ảnh</th>
              <th className="text-center">Danh mục</th>
              <th className="text-center">Tác giả</th>
              <th className="text-center">NXB</th>
              <th className="text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{product.product_name}</td>
                  <td className="text-center">{product.short_description}</td>
                  <td className="text-center">{product.price} VNĐ</td>
                  <td className="text-center">
                    <img
                      src={product.thumbnail}
                      alt={product.product_name}
                      className="img-thumbnail"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td className="text-center">
                    {product.category_id?.category_name}
                  </td>
                  <td className="text-center">
                    {product.author_id?.author_name}
                  </td>
                  <td className="text-center">{product.nxb_id?.nxb_name}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        to={`/admin/product-edit/${product._id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  Không có sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
