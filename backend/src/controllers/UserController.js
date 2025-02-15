import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import RoleModel from "../models/RoleModel.js";

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

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Xác nhận mật khẩu không khớp" });
    }

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { phone }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Tên đăng nhập, email hoặc số điện thoại đã tồn tại",
      });
    }

    // Tìm role mặc định nếu không có
    let userRole = role;
    if (!role || !mongoose.Types.ObjectId.isValid(role)) {
      const defaultRole = await RoleModel.findOne({ role: "User" });
      if (!defaultRole) {
        return res
          .status(500)
          .json({ message: "Vai trò mặc định không tồn tại" });
      }
      userRole = defaultRole._id;
    }

    // Băm mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
      phone,
      email,
      address,
      gender,
      birthday,
      role: userRole,
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
    const user = await UserModel.findOne({ username, isDeleted: false }).select(
      "+password"
    );

    if (!user) {
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password.trim());

    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

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
    console.error("Lỗi đăng nhập:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * @route GET /users
 * @desc Lấy danh sách tất cả người dùng (chỉ lấy user chưa bị xóa)
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ isDeleted: false }).select(
      "-password"
    );
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
    const user = await UserModel.findOne({
      _id: req.params.id,
      isDeleted: false,
    }).select("-password");
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
    let user = await UserModel.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    user.username = username || user.username;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    user.address = address || user.address;
    user.gender = gender || user.gender;
    user.birthday = birthday || user.birthday;

    // Chỉ cập nhật role nếu nó hợp lệ
    if (role && mongoose.Types.ObjectId.isValid(role)) {
      user.role = role;
    }

    await user.save();
    return res.status(200).json({ message: "Cập nhật thành công", user });
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
    const user = await UserModel.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    user.isDeleted = true;
    await user.save();

    return res.status(200).json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    console.error("Lỗi xóa người dùng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
