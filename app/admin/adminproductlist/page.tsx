import AdminProductList from "@/components/admin/subcomponents/AdminProductList";

const ProductListPage = () => {
  return (
    <div className="container mx-auto pt-10 mt-32">
      <h1 className="text-2xl font-bold mb-4">상품 전체 정보</h1>
      <AdminProductList />
    </div>
  );
};

export default ProductListPage;
