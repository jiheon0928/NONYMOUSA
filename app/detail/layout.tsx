// import QndExchange from "@/components/kmg/QndExchange";

import Exchange from "@/components/kmg/exchange/Exchange";
import Footer from "../main/components/footer/footer";
import Header from "../main/components/header/header";

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
