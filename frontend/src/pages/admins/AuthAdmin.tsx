import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { login, register } from "../../services/admin/authAdmin";

const AuthAdmin: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    address: "",
    // gender: "male",
    // birthday: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(formData);
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        setIsRegister(false);
      } else {
        const data = await login(formData.username, formData.password);
        localStorage.setItem("token", data.token);
        toast.success("Đăng nhập thành công!");
      }
    } catch (error: any) {
      toast.error(error.message || "Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h3 className="text-center">
              {isRegister ? "Đăng Ký" : "Đăng Nhập"}
            </h3>
            <form onSubmit={handleSubmit}>
              {isRegister && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Số điện thoại</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Địa chỉ</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Giới tính</label>
                    <select
                      name="gender"
                      className="form-select"
                      onChange={handleChange}
                    >
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ngày sinh</label>
                    <input
                      type="date"
                      name="birthday"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              <div className="mb-3">
                <label className="form-label">Tên đăng nhập</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              {isRegister && (
                <div className="mb-3">
                  <label className="form-label">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100">
                {isRegister ? "Đăng Ký" : "Đăng Nhập"}
              </button>
            </form>
            <p className="text-center mt-3">
              {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
              <button
                className="btn btn-link"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "Đăng Nhập" : "Đăng Ký"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthAdmin;
