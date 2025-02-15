import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProduct } from "../../services/admin/product";
import { Product } from "../../models/Product";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        if (data) {
          setProducts(data.data);
        }
      } catch (err) {
        setError("Không thể tải danh sách sản phẩm!");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center mt-5">Đang tải sản phẩm...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  // Lọc sản phẩm bán chạy và mới nhất
  const bestSelling = [...products]
    .sort((a, b) => b.sell_count - a.sell_count)
    .slice(0, 4);
  const newestProducts = [...products]
    .sort(
      (a, b) =>
        (b.createdAt ? new Date(b.createdAt).getTime() : 0) -
        (a.createdAt ? new Date(a.createdAt).getTime() : 0)
    )
    .slice(0, 4);

  return (
    <div className="container mt-4">
      {/* Banner */}
      <div className="jumbotron text-center bg-primary text-white py-5 rounded">
        <h1>Chào mừng đến với BookStore!</h1>
        <p>Kho tàng sách khổng lồ - Ưu đãi mỗi ngày.</p>
        <Link to="/products" className="btn btn-light mt-3">
          Khám Phá Ngay
        </Link>
      </div>

      {/* Sách bán chạy */}
      <section className="mt-5">
        <h2 className="text-center mb-4">Sách Bán Chạy</h2>
        <div className="row">
          {bestSelling.map((product) => (
            <div className="col-md-3" key={product._id}>
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
                    className="btn btn-success"
                  >
                    Mua ngay
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sách mới cập nhật */}
      <section className="mt-5">
        <h2 className="text-center mb-4">Sách Mới Nhất</h2>
        <div className="row">
          {newestProducts.map((product) => (
            <div className="col-md-3" key={product._id}>
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
                    className="btn btn-warning"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ưu đãi đặc biệt */}
      <section className="mt-5 text-center bg-light p-4 rounded">
        <h2 className="mb-3">Ưu Đãi Đặc Biệt</h2>
        <p>
          Giảm 20% cho đơn hàng trên 500.000đ. Mã: <strong>SALE20</strong>
        </p>
        <Link to="/products" className="btn btn-danger">
          Mua Ngay
        </Link>
      </section>
    </div>
  );
};

export default Home;
