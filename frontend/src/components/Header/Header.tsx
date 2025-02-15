import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          MyShop
        </Link>

        {/* Button toggle cho mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Danh mục menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Trang Chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Sản Phẩm
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                Giới Thiệu
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Liên Hệ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
