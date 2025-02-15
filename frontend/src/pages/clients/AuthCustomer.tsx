import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  loginCustomer,
  registerCustomer,
} from "../../services/client/customer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

interface AuthForm {
  customer_name?: string;
  customer_email: string;
  customer_phone?: string;
  customer_password: string;
  customer_confirmPassword?: string;
  address?: string;
}

const registerSchema = Joi.object({
  customer_name: Joi.string().min(3).max(50).required(),
  customer_email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  customer_phone: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .required(),
  customer_password: Joi.string().min(6).required(),
  customer_confirmPassword: Joi.string()
    .valid(Joi.ref("customer_password"))
    .required()
    .messages({ "any.only": "Mật khẩu xác nhận không khớp" }),
  address: Joi.string().min(5).max(200).required(),
});

const loginSchema = Joi.object({
  customer_email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  customer_password: Joi.string().min(6).required(),
});

const AuthCustomer: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [resolver, setResolver] = useState(() =>
    joiResolver(isRegister ? registerSchema : loginSchema)
  );

  useEffect(() => {
    setResolver(() => joiResolver(isRegister ? registerSchema : loginSchema));
  }, [isRegister]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver,
  });

  const navigate = useNavigate();

  const onSubmit = async (data: AuthForm) => {
    try {
      if (isRegister) {
        await registerCustomer(data);
        toast.success("Đăng ký thành công!", { position: "top-right" });
      } else {
        const response = await loginCustomer({
          customer_email: data.customer_email,
          customer_password: data.customer_password,
        });

        console.log("Phản hồi từ API:", response);

        if (!response || !response.token) {
          console.error("Dữ liệu API trả về:", response);
          throw new Error(
            "Đăng nhập thất bại! Không nhận được token từ server."
          );
        }

        localStorage.setItem("customer_token", response.token);
        toast.success("Đăng nhập thành công!", { position: "top-right" });
        navigate("/");
      }
    } catch (error: any) {
      console.error("Lỗi API:", error);

      let errorMessage = "Có lỗi xảy ra";
      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Lỗi từ server nhưng không có thông báo cụ thể";
      } else if (error.request) {
        errorMessage = "Không thể kết nối đến máy chủ. Vui lòng thử lại.";
      } else {
        errorMessage = error.message || "Đã xảy ra lỗi không xác định";
      }

      toast.error(errorMessage, { position: "top-right" });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">
              {isRegister ? "Đăng ký" : "Đăng nhập"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {isRegister && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Họ và tên</label>
                    <input
                      className="form-control"
                      {...register("customer_name")}
                    />
                    {errors.customer_name && (
                      <div className="text-danger">
                        {errors.customer_name.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Số điện thoại</label>
                    <input
                      className="form-control"
                      {...register("customer_phone")}
                    />
                    {errors.customer_phone && (
                      <div className="text-danger">
                        {errors.customer_phone.message}
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  {...register("customer_email")}
                />
                {errors.customer_email && (
                  <div className="text-danger">
                    {errors.customer_email.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Mật khẩu</label>
                <input
                  className="form-control"
                  type="password"
                  {...register("customer_password")}
                />
                {errors.customer_password && (
                  <div className="text-danger">
                    {errors.customer_password.message}
                  </div>
                )}
              </div>

              {isRegister && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Xác nhận mật khẩu</label>
                    <input
                      className="form-control"
                      type="password"
                      {...register("customer_confirmPassword")}
                    />
                    {errors.customer_confirmPassword && (
                      <div className="text-danger">
                        {errors.customer_confirmPassword.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Địa chỉ</label>
                    <input className="form-control" {...register("address")} />
                    {errors.address && (
                      <div className="text-danger">
                        {errors.address.message}
                      </div>
                    )}
                  </div>
                </>
              )}

              <button type="submit" className="btn btn-primary w-100">
                {isRegister ? "Đăng ký" : "Đăng nhập"}
              </button>
            </form>

            <p className="text-center mt-3">
              <span
                onClick={() => setIsRegister(!isRegister)}
                className="text-primary cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                {isRegister
                  ? "Đã có tài khoản? Đăng nhập"
                  : "Chưa có tài khoản? Đăng ký"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCustomer;
