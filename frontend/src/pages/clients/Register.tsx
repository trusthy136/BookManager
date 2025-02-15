import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import { registerUser } from "../../services/client/auth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
        gender: data.gender,
        birthday: data.birthday ? new Date(data.birthday) : new Date(),
        avatar: "",
        role: "",
      });

      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      toast.error("Đăng ký thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Đăng ký tài khoản</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Username */}
              <div className="mb-3">
                <label className="form-label">Họ và tên</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  {...register("username", {
                    required: "Tên đăng nhập không được để trống",
                  })}
                />
                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username.message}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email", {
                    required: "Email không được để trống",
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Mật khẩu</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  {...register("password", {
                    required: "Mật khẩu không được để trống",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu ít nhất 6 ký tự",
                    },
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>

              {/* Confirm Password
              <div className="mb-3">
                <label className="form-label">Nhập lại mật khẩu</label>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                  {...register("confirmPassword", {
                    required: "Xác nhận mật khẩu không được để trống",
                    validate: (value) => value === watch("password") || "Mật khẩu không khớp",
                  })}
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
              </div> */}

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="text"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  {...register("phone", {
                    required: "Số điện thoại không được để trống",
                  })}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone.message}</div>
                )}
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label">Địa chỉ</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  {...register("address", {
                    required: "Địa chỉ không được để trống",
                  })}
                />
                {errors.address && (
                  <div className="invalid-feedback">
                    {errors.address.message}
                  </div>
                )}
              </div>

              {/* Gender */}
              <div className="mb-3">
                <label className="form-label">Giới tính</label>
                <select className="form-control" {...register("gender")}>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              {/* Birthday */}
              <div className="mb-3">
                <label className="form-label">Ngày sinh</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("birthday")}
                />
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-primary w-100">
                Đăng ký
              </button>
            </form>

            <div className="text-center mt-3">
              <p>
                Đã có tài khoản? <a href="/login">Đăng nhập</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
