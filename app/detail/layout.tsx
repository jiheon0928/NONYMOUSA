// import QndExchange from "@/components/kmg/QndExchange";

import Exchange from "@/components/kmg/exchange/Exchange";
import Header from "../main/components/header/header";
import Footer from "../main/components/footer/footer";

const DetailLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Header />
      <div className="min-h-screen mt-80 px-20">
        {children}
        <Exchange />
      </div>
      <Footer />
    </div>
  );
};

export default DetailLayout;
