import { translateSizeKey } from "@/function/func";
import ToggleBtn from "./ToggleBtn";
import { ProductDetailProps } from "../types";

const ProductDetailInfo = ({
  details,
  materials,
  sizeInfo,
  sizeList,
}: ProductDetailProps) => {
  return (
    <div className="space-y-10 text-light_Grey text-start">
      {/* Details */}
      <ToggleBtn text="Details +">
        <div className="whitespace-pre-line leading-loose text-[11px]">
          {details}
        </div>
      </ToggleBtn>

      {/* Materials & Care */}
      <ToggleBtn text="Materials & Care +">
        <div className="whitespace-pre-line leading-loose text-[11px]">
          {materials}
        </div>
      </ToggleBtn>

      {/* Size & Fit */}
      <ToggleBtn text="Size & Fit +">
        <div>
          <table className="w-full text-[11px] border-collapse border border-light_Grey mb-2 text-center">
            <thead>
              <tr>
                {sizeList.map((item) => (
                  <th
                    key={item.key}
                    className="py-4 px-2 border border-light_Grey font-medium"
                  >
                    {translateSizeKey(item.key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {sizeList.map((item) => (
                  <td
                    key={item.key}
                    className="py-4 px-2 border border-light_Grey"
                  >
                    {item.value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <div className="text-[10px] whitespace-pre-line">{sizeInfo}</div>
        </div>
      </ToggleBtn>
    </div>
  );
};

export default ProductDetailInfo;
