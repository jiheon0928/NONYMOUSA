import Link from "next/link";
import { ProductType } from "../productType";

const ProductColors = ({
  productCode,
  productHexCodes,
}: Pick<ProductType, "productCode" | "productHexCodes">) => {
  if (!productHexCodes) return null;

  return (
    <div className="flex gap-2 mt-2 justify-center">
      {productHexCodes.map((hex, i) => (
        <Link key={i} href={`../detail/${productCode}${hex}`}>
          <span
            style={{
              display: "block",
              margin: "0 auto",
              width: "10px",
              height: "10px",
              backgroundColor: hex,
              borderRadius: "2px",
            }}
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductColors;
