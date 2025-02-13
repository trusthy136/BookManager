import {
  FaHome,
  FaList,
  FaProductHunt,
  FaShoppingCart,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import { IoColorPaletteOutline } from "react-icons/io5";
import { CgSize } from "react-icons/cg";
import { Outlet, Link, useLocation } from "react-router-dom";
import { RiDiscountPercentFill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";

const LayoutAdmin = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: <FaTachometerAlt />, label: "Bảng điều khiển" },
    { path: "/admin/user", icon: <FaUser />, label: "Người dùng" },
    { path: "/admin/product", icon: <FaProductHunt />, label: "Sản phẩm" },
    { path: "/admin/category", icon: <FaList />, label: "Danh mục" },
    {
      path: "/admin/author",
      icon: <IoColorPaletteOutline />,
      label: "Tác giả",
    },
    { path: "/admin/size", icon: <CgSize />, label: "Kích cỡ" },
    {
      path: "/admin/vouchers",
      icon: <RiDiscountPercentFill />,
      label: "Vouchers",
    },
    { path: "/admin/order", icon: <FaShoppingCart />, label: "Đơn hàng" },
    {
      path: "/admin/comments",
      icon: <BiSolidCommentDetail />,
      label: "Bình luận",
    },
    { path: "/admin/slides", icon: <AiFillSetting />, label: "Cài đặt" },
    { path: "/", icon: <FaHome />, label: "Client" },
  ];

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div
        className="d-flex flex-column bg-dark text-white p-3 vh-100"
        style={{ width: "250px" }}
      >
        {/* <div className="text-center mb-4">
          <img
            src="https://i.imgur.com/jInJnWw.png"
            alt="Logo"
            className="img-fluid"
          />
        </div> */}
        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center ${
                  location.pathname === item.path
                    ? "active bg-light text-dark"
                    : "text-white"
                }`}
              >
                {item.icon} <span className="ms-2">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3 mb-4 rounded">
          <div></div>
          <div className="d-flex align-items-center">
            <span className="me-3">Hi, Admin</span>
            <button className="btn btn-danger">Logout</button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutAdmin;
