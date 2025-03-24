// import QndExchange from "@/components/kmg/QndExchange";

import Exchange from "@/components/kmg/exchange/Exchange";

const DetailLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen mt-80 px-20">
      {children}
      <Exchange />
    </div>
  );
};

export default DetailLayout;
