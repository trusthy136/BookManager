import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../../services/admin/category";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!categoryName.trim()) {
      setError("Tên danh mục không được để trống.");
      return;
    }

    try {
      await createCategory({ category_name: categoryName });
      alert("Thêm danh mục thành công!");
      navigate("/admin/category"); // Điều hướng về danh sách danh mục
    } catch (error) {
      setError("Lỗi khi thêm danh mục!");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center text-decoration-underline">Thêm Danh Mục</h3>

      <form onSubmit={handleSubmit} className="w-50 mx-auto mt-4">
        <div className="mb-3">
          <label className="form-label">Tên danh mục:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên danh mục..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        {error && <p className="text-danger">{error}</p>}

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Thêm danh mục
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/category")}
          >
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
