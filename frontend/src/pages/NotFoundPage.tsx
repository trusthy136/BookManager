import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-dark text-white">
      <div className="card bg-secondary text-white p-5 shadow-lg">
        <h1 className="display-1 fw-bold">404</h1>
        <h2 className="fs-3 fw-semibold mb-3">Trang không tìm thấy</h2>
        <p className="mb-4">
          Xin lỗi, trang bạn tìm không tồn tại hoặc đã bị xóa.
        </p>
        <button
          className="btn btn-primary px-4 py-2"
          onClick={handleBackToHome}
        >
          Trở về trang chủ
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
