import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
