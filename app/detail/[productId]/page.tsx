import ProductInfo from "@/components/kmg/ProductInfo";

type DetailCodePageProps = {
  params: { productId: string };
};
const DetailCodePage = async ({ params }: DetailCodePageProps) => {
  const { productId } = params;
  return <ProductInfo id={productId} />;
};

export default DetailCodePage;
