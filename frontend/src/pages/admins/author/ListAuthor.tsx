import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { getAuthors, deleteAuthor } from "../../../services/admin/author";
import { Author } from "../../../models/Product";

const ListAuthor = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        const data = await getAuthors();
        if (data.success === false) {
          setError(data.message);
        } else {
          setAuthors(data.data);
        }
      } catch (err) {
        setError("Không thể tải danh sách tác giả.");
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tác giả này không?")) {
      try {
        const response = await deleteAuthor(id);
        if (response.success) {
          setAuthors(authors.filter((author) => author._id !== id));
        } else {
          alert(response.message);
        }
      } catch (error) {
        alert("Lỗi khi xóa tác giả!");
      }
    }
  };

  if (loading)
    return <p className="text-center mt-4">Đang tải danh sách tác giả...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container mt-4">
      {/* Breadcrumb */}
      <div className="d-flex align-items-center mb-3">
        <IoHomeOutline className="me-2" />
        <GrFormNext className="me-2" />
        <h3 className="text-decoration-underline mb-0">Quản lý tác giả</h3>
      </div>

      {/* Nút thêm tác giả */}
      <div className="mb-4">
        <Link to="/admin/author-add" className="btn btn-primary">
          Thêm Tác Giả Mới
        </Link>
      </div>

      {/* Bảng danh sách tác giả */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Tên tác giả</th>
              <th className="text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {authors.length > 0 ? (
              authors.map((author, index) => (
                <tr key={author._id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{author.author_name}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        to={`/admin/author-edit/${author._id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(author._id)}
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
                <td colSpan={3} className="text-center py-4">
                  Không có tác giả nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAuthor;
