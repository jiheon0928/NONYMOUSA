import Link from "next/link";
import { ProductType } from "./productType";
import ProductImage from "./subComponents/ProductImage";
import ProductTitle from "./subComponents/ProductTitle";
import ProductPrice from "./subComponents/ProductPrice";
import ProductColors from "./subComponents/ProductColors";

const ProductWrap = ({
  productId,
  productName,
  productCode,
  productHexCodes,
  productImage,
  productPrice,
}: ProductType) => {
  if (!productHexCodes) return "";

  return (
    <div key={productId} className="mb-10">
      <Link href={`/detail/${productId?.toString()}`}>
        <div className="flex flex-col items-center">
          <ProductImage productImage={productImage} />
          <ProductTitle productName={productName} />
          <ProductPrice productPrice={productPrice} />
        </div>
      </Link>

      <ProductColors
        productCode={productCode}
        productHexCodes={productHexCodes}
      />
    </div>
  );
};
export default ProductWrap;
