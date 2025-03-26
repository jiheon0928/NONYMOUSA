import Footer from "../main/components/footer/footer";
import Header from "../main/components/header/header";

const AdminLayout = ({ children }: any) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AdminLayout;
