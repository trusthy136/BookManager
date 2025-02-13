import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { Category } from "../../../models/Category";
import {
  deleteCategory,
  getCategories,
} from "../../../services/admin/category";

const ListCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories((data as { data: Category[] }).data);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải danh mục.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này không?")) {
      try {
        const response = await deleteCategory(id);
        if (response.success) {
          setCategories(categories.filter((category) => category._id !== id));
        } else {
          alert(response.message);
        }
      } catch (error) {
        alert("Lỗi khi xóa danh mục!");
      }
    }
  };

  if (loading) return <p className="text-center mt-4">Đang tải danh mục...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-3">
        <IoHomeOutline className="me-2" />
        <GrFormNext className="me-2" />
        <h3 className="text-decoration-underline mb-0">Quản lý danh mục</h3>
      </div>

      {/* Nút thêm danh mục */}
      <div className="mb-4">
        <Link to="/admin/category-add" className="btn btn-primary">
          Thêm Danh Mục Mới
        </Link>
      </div>

      {/* Bảng danh sách danh mục */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Tên danh mục</th>
              <th className="text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={category._id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{category.category_name}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        to={`/admin/category-edit/${category._id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Không có danh mục nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCategory;
