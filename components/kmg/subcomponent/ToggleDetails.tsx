import { productDetailData } from "../data/size";
import SizeBox from "./SizeBox";
import ToggleInfo from "./ToggleInfo";

const ToggleDetails = () => {
  return (
    <div className="flex flex-col gap-8 border-b pb-8">
      <ToggleInfo
        TextclassName="text-[16px]"
        boxStyle="flex-col gap-[2px]"
        detailData={productDetailData.details}
        text="Detail"
      />
      <ToggleInfo
        TextclassName="text-[16px]"
        boxStyle="flex-col gap-[2px]"
        detailData={productDetailData.materialsAndCare}
        text="Materials & Care "
      />
      <SizeBox />
    </div>
  );
};

export default ToggleDetails;
