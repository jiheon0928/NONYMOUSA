import ProductForm from "@/components/admin/subcomponents/ProductForm";

const AddProductPage = () => {
  return (
    <div className="container mx-auto pt-10">
      <h1 className="text-2xl font-bold mb-4">상품 등록 페이지</h1>
      <ProductForm />
    </div>
  );
};

export default AddProductPage;
