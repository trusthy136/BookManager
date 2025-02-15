import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

/**
 * @route POST /users/register
 * @desc Đăng ký tài khoản mới
 */
export const register = async (req, res) => {
  try {
    const {
      username,
      password,
      confirmPassword,
      phone,
      email,
      address,
      gender,
      birthday,
      role,
    } = req.body;

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Xác nhận mật khẩu không khớp" });
    }

    // Kiểm tra user đã tồn tại chưa
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { phone }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Tên đăng nhập, email hoặc số điện thoại đã tồn tại",
      });
    }

    // Tạo user mới
    const newUser = new UserModel({
      username,
      password, // Mật khẩu sẽ tự động được hash nhờ pre('save') trong model
      phone,
      email,
      address,
      gender,
      birthday,
      role,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "Đăng ký thành công", user: newUser });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * @route POST /users/login
 * @desc Đăng nhập tài khoản
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("🔍 Đang kiểm tra username:", username);

    // Tìm user theo username
    const user = await UserModel.findOne({ username }).select("+password");

    if (!user) {
      console.log("❌ Không tìm thấy user trong DB!");
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }

    console.log("✅ Tìm thấy user:", user);

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Mật khẩu không đúng!");
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    console.log("✅ Đăng nhập thành công!");

    // Tạo token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.password = undefined;

    return res
      .status(200)
      .json({ message: "Đăng nhập thành công", token, user });
  } catch (error) {
    console.error("🔥 Lỗi đăng nhập:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * @route GET /users
 * @desc Lấy danh sách tất cả người dùng
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi lấy danh sách người dùng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * @route GET /users/:id
 * @desc Lấy thông tin chi tiết người dùng
 */
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Lỗi lấy thông tin người dùng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * @route PUT /users/:id
 * @desc Cập nhật thông tin người dùng
 */
export const updateUser = async (req, res) => {
  try {
    const { username, phone, email, address, gender, birthday, role } =
      req.body;

    // Kiểm tra người dùng tồn tại
    let user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    // Cập nhật thông tin
    user.username = username || user.username;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    user.address = address || user.address;
    user.gender = gender || user.gender;
    user.birthday = birthday || user.birthday;
    user.role = role || user.role;

    await user.save();

    return res
      .status(200)
      .json({ message: "Cập nhật thông tin thành công", user });
  } catch (error) {
    console.error("Lỗi cập nhật người dùng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * @route DELETE /users/:id
 * @desc Xóa người dùng (xóa mềm)
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    await UserModel.findByIdAndUpdate(req.params.id, { isDeleted: true });

    return res.status(200).json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    console.error("Lỗi xóa người dùng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
