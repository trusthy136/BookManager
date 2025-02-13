import "./App.css";
import { Routes, Route } from "react-router-dom";
import ListProduct from "./pages/admins/product/ListProduct";
import LayoutAdmin from "./components/layout/LayoutAdmin/layoutAdmin";
import AddProduct from "./pages/admins/product/AddProduct";
import ListCategory from "./pages/admins/category/ListCategory";
import AddCategory from "./pages/admins/category/AddCategory";
import EditCategory from "./pages/admins/category/EditCategory";
import ListAuthor from "./pages/admins/author/ListAuthor";

function App() {
  return (
    <>
      <Routes>
        <Route path="/"></Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="/admin/product" element={<ListProduct />} />
          <Route path="/admin/product-add" element={<AddProduct />} />
          <Route path="/admin/product-edit/:id" element={<ListProduct />} />
          <Route path="/admin/category" element={<ListCategory />} />
          <Route path="/admin/category-add" element={<AddCategory />} />
          <Route path="/admin/category-edit/:id" element={<EditCategory />} />
          <Route path="/admin/author" element={<ListAuthor />} />
          <Route path="/admin/author-add" element={<EditCategory />} />
          <Route path="/admin/author-edit/:id" element={<EditCategory />} />
        </Route>
        <Route path="*" element />
      </Routes>
    </>
  );
}

export default App;
