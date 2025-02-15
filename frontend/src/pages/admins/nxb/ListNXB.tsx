import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteNXB, getAllNXB } from "../../../services/admin/nxb";
import { NXB } from "../../../models/Product";

const ListNXB = () => {
  const [nxbList, setNXBList] = useState<NXB[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNXB = async () => {
      try {
        const data = await getAllNXB();
        setNXBList(data.data);
      } catch (error) {
        setError("Không thể tải danh sách nhà xuất bản.");
      }
    };
    fetchNXB();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này?")) {
      try {
        await deleteNXB(id);
        setNXBList(nxbList.filter((nxb) => nxb._id !== id));
        alert("Xóa thành công!");
      } catch (error) {
        alert("Lỗi khi xóa nhà xuất bản!");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center text-decoration-underline">
        Danh Sách Nhà Xuất Bản
      </h3>
      {error && <p className="text-danger text-center">{error}</p>}
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/admin/nxb-add")}
      >
        Thêm Nhà Xuất Bản
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên Nhà Xuất Bản</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {nxbList.map((nxb, index) => (
            <tr key={nxb._id}>
              <td>{index + 1}</td>
              <td>{nxb.nxb_name}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => navigate(`/admin/nxb-edit/${nxb._id}`)}
                >
                  Chỉnh sửa
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(nxb._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListNXB;
