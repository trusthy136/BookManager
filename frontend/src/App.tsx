import "./App.css";
import { Routes, Route } from "react-router-dom";
import ListProduct from "./pages/admins/product/ListProduct";
import LayoutAdmin from "./components/layout/LayoutAdmin/layoutAdmin";
import AddProduct from "./pages/admins/product/AddProduct";
import ListCategory from "./pages/admins/category/ListCategory";
import AddCategory from "./pages/admins/category/AddCategory";
import EditCategory from "./pages/admins/category/EditCategory";
import ListAuthor from "./pages/admins/author/ListAuthor";
import AddAuthor from "./pages/admins/author/AddAuthor";
import EditAuthor from "./pages/admins/author/EditAuthor";
import ListNXB from "./pages/admins/nxb/ListNXB";
import AddNXB from "./pages/admins/nxb/AddNXB";
import EditNXB from "./pages/admins/nxb/EditNXB";
import EditProduct from "./pages/admins/product/EditProduct";
import Home from "./pages/clients/Home";
import LayoutClient from "./components/layout/LayoutClient/layoutClient";
import AllProducts from "./pages/clients/AllProducts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route path="/" index element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="/admin/product" element={<ListProduct />} />
          <Route path="/admin/product-add" element={<AddProduct />} />
          <Route path="/admin/product-edit/:id" element={<EditProduct />} />

          <Route path="/admin/category" element={<ListCategory />} />
          <Route path="/admin/category-add" element={<AddCategory />} />
          <Route path="/admin/category-edit/:id" element={<EditCategory />} />

          <Route path="/admin/author" element={<ListAuthor />} />
          <Route path="/admin/author-add" element={<AddAuthor />} />
          <Route path="/admin/author-edit/:id" element={<EditAuthor />} />

          <Route path="/admin/nxb" element={<ListNXB />} />
          <Route path="/admin/nxb-add" element={<AddNXB />} />
          <Route path="/admin/nxb-edit/:id" element={<EditNXB />} />
        </Route>
        <Route path="*" element />
      </Routes>
    </>
  );
}

export default App;
