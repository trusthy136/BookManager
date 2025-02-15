import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAuthor } from "../../../services/admin/author";

const AddAuthor = () => {
  const [author_name, setAuthorName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!author_name.trim()) {
      setError("Tên tác giả không được để trống.");
      return;
    }

    try {
      await createAuthor({ author_name });
      alert("Thêm tác giả thành công!");
      navigate("/admin/author"); // Điều hướng về danh sách tác giả
    } catch (error) {
      setError("Lỗi khi thêm tác giả!");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center text-decoration-underline">Thêm Tác Giả</h3>
      <form onSubmit={handleSubmit} className="w-50 mx-auto mt-4">
        <div className="mb-3">
          <label className="form-label">Tên Tác Giả:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên tác giả..."
            value={author_name}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Thêm Tác Giả
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/author")}
          >
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAuthor;
