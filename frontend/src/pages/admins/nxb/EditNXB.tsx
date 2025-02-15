import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNXBById, updateNXB } from "../../../services/admin/nxb";

const EditNXB = () => {
  const { id } = useParams<{ id: string }>();
  const [nxb_name, setNXBName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNXB = async () => {
      try {
        const data = await getNXBById(id!);
        setNXBName(data.data.nxb_name);
      } catch (error) {
        setError("Không thể tải thông tin nhà xuất bản.");
      }
    };
    fetchNXB();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nxb_name.trim()) {
      setError("Tên nhà xuất bản không được để trống.");
      return;
    }

    try {
      await updateNXB(id!, { nxb_name });
      alert("Cập nhật nhà xuất bản thành công!");
      navigate("/admin/nxb");
    } catch (error) {
      setError("Lỗi khi cập nhật nhà xuất bản!");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center text-decoration-underline">
        Chỉnh Sửa Nhà Xuất Bản
      </h3>
      <form onSubmit={handleSubmit} className="w-50 mx-auto mt-4">
        <div className="mb-3">
          <label className="form-label">Tên Nhà Xuất Bản:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên nhà xuất bản..."
            value={nxb_name}
            onChange={(e) => setNXBName(e.target.value)}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Lưu Thay Đổi
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/nxb")}
          >
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNXB;
