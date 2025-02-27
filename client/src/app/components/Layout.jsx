import Footer from "./Footer";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="relative">
      <Nav />
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
