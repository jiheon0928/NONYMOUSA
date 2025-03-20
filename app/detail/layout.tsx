import QndExchange from "@/components/kmg/QndExchange";

const DetailLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen">
      {children}
      <QndExchange />
    </div>
  );
};

export default DetailLayout;
