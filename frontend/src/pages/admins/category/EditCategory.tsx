import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategoryById,
  updateCategory,
} from "../../../services/admin/category";

const EditCategory = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await getCategoryById(id!);

        // Kiểm tra response có chứa dữ liệu không
        if (response && response.data) {
          setCategoryName(response.data.category_name);
        } else {
          setError("Không tìm thấy danh mục.");
        }
      } catch (error) {
        setError("Lỗi khi tải dữ liệu danh mục.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!categoryName.trim()) {
      setError("Tên danh mục không được để trống.");
      return;
    }

    try {
      await updateCategory(id!, { category_name: categoryName });
      alert("Cập nhật danh mục thành công!");
      navigate("/admin/category");
    } catch (error) {
      setError("Lỗi khi cập nhật danh mục!");
    }
  };

  if (loading) return <p className="text-center mt-4">Đang tải...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container mt-4">
      <h3 className="text-center text-decoration-underline">
        Chỉnh Sửa Danh Mục
      </h3>

      <form onSubmit={handleSubmit} className="w-50 mx-auto mt-4">
        <div className="mb-3">
          <label className="form-label">Tên danh mục:</label>
          <input
            type="text"
            className="form-control"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        {error && <p className="text-danger">{error}</p>}

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            Cập nhật danh mục
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/categories")}
          >
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
