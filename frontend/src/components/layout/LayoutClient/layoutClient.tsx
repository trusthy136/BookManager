import Header from "../../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../Footer/Footer";

const LayoutClient = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutClient;
