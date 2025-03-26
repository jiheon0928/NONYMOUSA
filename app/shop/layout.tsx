import Footer from "../main/components/footer/footer";
import "../globals.css";
import "../main/css/media.css";
import Header from "../main/components/header/header";

const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HeaderLayout;
