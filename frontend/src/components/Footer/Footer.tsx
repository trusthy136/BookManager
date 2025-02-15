const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Giới thiệu */}
          <div className="col-md-4">
            <h5>Về Chúng Tôi</h5>
            <p>
              MyShop là nền tảng mua sắm sách trực tuyến với nhiều thể loại
              phong phú, mang đến trải nghiệm tuyệt vời cho bạn!
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div className="col-md-4">
            <h5>Liên Kết Nhanh</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Trang Chủ
                </a>
              </li>
              <li>
                <a href="/products" className="text-white text-decoration-none">
                  Sản Phẩm
                </a>
              </li>
              <li>
                <a href="/about" className="text-white text-decoration-none">
                  Giới Thiệu
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none">
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="col-md-4">
            <h5>Liên Hệ</h5>
            <p>Email: support@myshop.com</p>
            <p>Hotline: 0123 456 789</p>
            <p>Địa chỉ: 123 Đường ABC, TP. Hồ Chí Minh</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          <p className="mb-0">
            © {new Date().getFullYear()} MyShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
